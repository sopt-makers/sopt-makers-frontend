export type BasicCategory = {
  code: string;
  name: string;
  content: string | null;
  hasBlind: boolean;
  children: Array<BasicCategory>;
};

export type CategorySelectType = Array<BasicCategory>;
