import { PairDto } from '../../../usecase/pair/query-service-interface/pair-query-service';

export class GetPairsResponse {
  pairs: Pair[];

  constructor(pairsDtos: PairDto[]) {
    this.pairs = pairsDtos.map(
      ({ id, name, participants, createdAt, updatedAt }) => {
        return new Pair({
          id,
          name,
          participants,
          createdAt,
          updatedAt,
        });
      },
    );
  }
}

class Participant {
  id: string;
  name: string;
  email: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  pairId: string;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    pairId: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.pairId = props.pairId;
  }
}

class Pair {
  id: string;
  name: string;
  participants: Participant[];
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    participants: Participant[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.participants = props.participants;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
