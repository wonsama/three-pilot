export type LinkData = {
  from: string;
  to: string;
};

export type NodeData = {
  key: string;
  text: string;
  procNodeTcode?: string;
};

export interface ProcessType {
  linkDataArray: LinkData[];
  nodeDataArray: NodeData[];
  procNm: string;
  procSrnm: string;
}
