import { PairId } from './pair-id';
import { PairName } from './pair-name';
import { Participant } from '../participant/participant';

interface PairProps {
  id: PairId;
  name: PairName;
  participants: Participant[];
  createdAt: Date;
  updatedAt: Date;
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
      throw new Error(
        `ペアに所属できる参加者は${this.MIN_PARTICIPANT}~${this.MAX_PARTICIPANT}名です`,
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
    };
  }
}
