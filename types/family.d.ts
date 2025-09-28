export interface FamilyRequest {
  avatarUrl: string;
  id?: string;
  fromUid: string;
  toUid: string; 
  relation: string;
  notes?: string;
  displayName: string;
  status: "pending" | "accepted" | "declined";
  createdAt?: any;
}

export interface FamilyRequestInput {
  fromUid: string;
  toUsername: string; 
  relation: string;
  notes?: string;
  displayName: string;
}

export interface FamilyMember {
  uid: string;
  relation: string;
  avatarUrl?: string;
  displayName?: string;
}