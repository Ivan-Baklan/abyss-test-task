import { createContext } from "react";


export interface TreeContext {
    tree: TreeNode;
    addNode: (node: TreeNode, id: number) => void;
    removeNode: (node: TreeNode) => void;
    editLabel: (node: TreeNode, label: string) => void
}

export const TreeContext = createContext<TreeContext>({
    tree: {
        id: 0,
        label: "Categories",
        children: []

    },
    addNode: (node, id,) => { },
    removeNode: (node) => { },
    editLabel: (node, label) => { },
})

