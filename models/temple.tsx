export interface Temple {
  Name: string;
  Address1: string;
  Address2: string;
  ManagementCommitee: ManagementCommitee;
  Followers: string[];
}

export interface ManagementCommitee {
  Manager: string;
  PradhanaArchaka: string;
  Poojari: string;
}
