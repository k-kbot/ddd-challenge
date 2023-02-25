import { PairId } from './pair-id';
import { PairName } from './pair-name';
import { Participant } from '../participant/participant';
import { TeamId } from '../team/team-id';
import { DomainException } from '../shared/domain-exception';

interface PairProps {
  id: PairId;
  name: PairName;
  participants: Participant[];
  createdAt: Date;
  updatedAt: Date;
  teamId: TeamId;
}

type PairBuildProps = Omit<PairProps, 'createdAt' | 'updatedAt'>;

export class Pair {
  private static readonly MIN_PARTICIPANT = 2;
  private static readonly MAX_PARTICIPANT = 3;

  private constructor(private props: PairProps) {}

  static build(props: PairBuildProps): Pair {
    if (
      props.participants.length < this.MIN_PARTICIPANT ||
      this.MAX_PARTICIPANT < props.participants.length
    ) {
      throw new DomainException(
        `ペアに所属できる参加者は${this.MIN_PARTICIPANT}~${this.MAX_PARTICIPANT}名です。`,
        400,
      );
    }

    for (const participant of props.participants) {
      const { status } = participant.getAllProperties();
      if (status !== 'active') {
        throw new DomainException(
          'ステータスが在籍中ではない参加者はペアに所属できません。',
          400,
        );
      }
    }

    const teamIds = props.participants.map((participant) => {
      return participant.getAllProperties().teamId;
    });
    if (!teamIds.every((teamId) => teamId === teamIds[0])) {
      throw new DomainException(
        'ペアに所属する参加者は、同じチームに所属している必要があります。',
        400,
      );
    }

    return new Pair({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static rebuild(props: PairProps): Pair {
    return new Pair({
      ...props,
    });
  }

  getAllProperties() {
    return {
      id: this.props.id.value,
      name: this.props.name.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      teamId: this.props.teamId.value,
    };
  }
}
