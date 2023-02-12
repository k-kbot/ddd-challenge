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
  private constructor(private props: PairProps) {}

  static build(props: PairBuildProps): Pair {
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
