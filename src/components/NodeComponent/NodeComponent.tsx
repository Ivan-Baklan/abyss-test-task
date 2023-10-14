import { useContext, useState } from 'react'
import { TreeContext } from '../hooks'
import { Checkmark, Cross, Edit, PlusSign } from '../icons/Icons'
import styles from './NodeComponent.module.css'

interface NodeComponentProps {
    treeNode: TreeNode,
    label: string,
    depthLevel: number;
}

const colorOfDepth: { [keys: number]: string } = {
    1: styles.first,
    2: styles.second,
    3: styles.third,
    4: styles.forth
}

export default function NodeComponent({
    treeNode,
    label,
    depthLevel
}: NodeComponentProps) {

    const [categoryName, setCategoryName] = useState(label)
    const [isEdit, setIsEdit] = useState({
        edited: false,
        editing: true
    })

    const { addNode, removeNode, editLabel } = useContext(TreeContext);

    const newId: string = treeNode.id.toString() + (treeNode.children?.length + 1 || "1")


    const editButtonsBuilder = (): React.JSX.Element => {
        if (isEdit.edited) {
            return (
                <div className={styles.editing_block}>
                    <button
                        type='button'
                        className={`${styles.node_btn} ${styles.node_btn__gray}`}
                        onClick={() => { addNode(treeNode, Number.parseInt(newId)) }}
                    >
                        <PlusSign width={15} height={15} stroke={"white"} fill={"white"} />
                    </button>
                    <button
                        type='button'
                        className={`${styles.node_btn} ${styles.node_btn__gray}`}
                        onClick={() => { setIsEdit({ edited: false, editing: true }) }}
                    >
                        <Edit width={15} height={15} stroke={"white"} fill={"white"} />
                    </button>
                    <button
                        type='button'
                        className={`${styles.node_btn} ${styles.node_btn__red}`}
                        onClick={() => { removeNode(treeNode) }}
                    >
                        <Cross width={15} height={15} stroke={"white"} fill={"white"} />
                    </button >
                </div>
            )
        } else if (isEdit.editing) {
            return (
                <div className={styles.editing_block}>
                    <button
                        type='button'
                        className={`${styles.node_btn} ${styles.node_btn__yellow}`}
                        onClick={() => {
                            setCategoryName("")
                            setIsEdit({ edited: true, editing: false })
                        }}
                    >
                        <Cross width={15} height={15} stroke={"white"} fill={"white"} />
                    </button>
                    <button
                        type='button'
                        className={`${styles.node_btn} ${styles.node_btn__green}`}
                        onClick={() => {
                            editLabel(treeNode, categoryName)
                            setIsEdit({ edited: true, editing: false })
                        }}
                    >
                        <Checkmark width={15} height={15} stroke={"white"} fill={"transparent"} />
                    </button>
                </div>
            )
        }
        return (<></>)
    }

    return (
        <div className={styles.childTreeNode}>

            <input
                type="text"
                name="category"
                value={categoryName}
                onChange={(e) => { setCategoryName(e.target.value) }}
                placeholder="Category name"
                disabled={!isEdit.editing}
                style={{}}
                className={`${styles.label_input} ${colorOfDepth[depthLevel]} ${isEdit.editing ? styles.editing : styles.edited}`}
            />
            {editButtonsBuilder()}
        </div>
    )
}