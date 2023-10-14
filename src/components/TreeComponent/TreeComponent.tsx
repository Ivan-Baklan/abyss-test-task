import { NodeComponent } from '../Components'


import styles from './TreeComponent.module.css'

interface TreeComponentProps {
    treeData: TreeNode[],
    depthLevel: number

}


export default function TreeComponent({ treeData, depthLevel }: TreeComponentProps) {







    return (
        <ul className={styles.childTreeContainer}>
            {treeData.map((treeNode) => (
                <li key={treeNode.id} className={styles.childTree_item}>

                    <NodeComponent treeNode={treeNode} label={treeNode.label} depthLevel={depthLevel} />
                    {treeNode?.children.length !== 0 ? <TreeComponent treeData={treeNode?.children} depthLevel={depthLevel + 1} /> : <></>}


                </li>
            ))}
        </ul>
    )
}