export type VideoStreamNodeProps = {
    src: string;
    meshTargetIdentifier: string;
    uniformValue: string;
};
export type AppendedNodeProps = VideoStreamNodeProps;
export type AppendedNodesConfig = {
    nodeType: string;
    id: string;
    props: AppendedNodeProps;
};
