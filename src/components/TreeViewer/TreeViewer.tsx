import React, { useContext, useRef, useState } from 'react'
import { TreeComponent } from '../Components'
import { TreeContext } from '../hooks'
import PlusSign from '../icons/PlusSign'
import styles from './TreeViewer.module.css'

interface TreeViewerProps {
    treeViewRef: React.RefObject<HTMLUListElement>
}



export default function TreeViewer({ treeViewRef }: TreeViewerProps) {


    const { tree, addNode, removeNode } = useContext(TreeContext)

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const mouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
        setIsMouseDown(true)
        const x = (treeViewRef.current?.offsetLeft ?? 0) - e.clientX;
        const y = (treeViewRef.current?.offsetTop ?? 0) - e.clientY;
        setOffset({ x, y })
    }

    const mouseUp = () => {
        setIsMouseDown(false)
    }

    const movingHandle = (e: React.MouseEvent<HTMLUListElement>) => {
        if (isMouseDown && treeViewRef.current !== undefined) {

            const treeList = treeViewRef.current as HTMLUListElement

            treeList.style.left = (e.clientX + offset.x) + "px"
            treeList.style.top = (e.clientY + offset.y) + "px"
        }
    }

    const newId = (tree.children?.length || 0) + 1

    return (
        <section className={styles.mainSection}>
            <ul className={styles.rootTreeContainer} ref={treeViewRef} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={movingHandle}>
                <li className={styles.rootTree_item}>
                    <div className={styles.treeNode}>
                        <h3>{tree.label}</h3>
                        <button
                            type='button'
                            className={styles.addNewNode}
                            onClick={() => { addNode(tree, newId) }}
                        >
                            <PlusSign width={20} height={20} stroke={"#C6CED0"} />
                        </button>
                    </div>
                    {tree.children?.length !== 0 ? <TreeComponent treeData={tree.children} depthLevel={1} /> : <></>}

                </li>
            </ul>


        </section>
    )
}