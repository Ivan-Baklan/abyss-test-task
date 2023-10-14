import { useRef, useState } from 'react';
import './App.css';
import { Navbar, TreeViewer } from './components/Components';
import { TreeContext } from './components/hooks';

import './App.css';

function App() {
  const treeViewRef = useRef<HTMLUListElement>(null)

  const [tree, setTree] = useState<TreeNode>({ id: 0, label: "Categories", children: [] })

  const addNode: TreeContext["addNode"] = (node: TreeNode, arrayId: number) => {
    const treeCopy = { ...tree }
    if (node.id === 0) {

      treeCopy.children.push({ id: arrayId, label: "", children: [] })

    } else {

      const addChild = (arrayOfnodes: TreeNode[]) => {

        if (arrayOfnodes.includes(node)) {
          node.children.push({ id: arrayId, label: "", children: [] })
          const indexOfNode = treeCopy.children.indexOf(node)

          treeCopy.children[indexOfNode] = node

        } else {
          arrayOfnodes.map((node) => addChild(node.children))
        }

      }
      addChild(treeCopy.children)
    }
    setTree(treeCopy)
  }

  const removeNode: TreeContext["removeNode"] = (node) => {

    const copyTree = { ...tree }

    if (copyTree.children.includes(node)) {
      const nodeIndex = copyTree.children.indexOf(node)
      copyTree.children.splice(nodeIndex, 1)

    } else {
      const deleteChild = (arrOfNodes: TreeNode[]) => {
        if (arrOfNodes.includes(node)) {
          const nodeIndex = arrOfNodes.indexOf(node)
          arrOfNodes.splice(nodeIndex, 1)

        } else {
          arrOfNodes.map((node) => deleteChild(node.children))
        }
      }

      deleteChild(copyTree.children)
    }

    setTree(copyTree)
  }

  const editLabel: TreeContext["editLabel"] = (node: TreeNode, label: string) => {

    node.label = label
    const copyTree = { ...tree }

    if (copyTree.children.includes(node)) {
      const nodeIndex = copyTree.children.indexOf(node)
      copyTree.children[nodeIndex] = node
    } else {
      const editChildLabel = (arrOfNodes: TreeNode[]) => {
        if (arrOfNodes.includes(node)) {
          const nodeIndex = copyTree.children.indexOf(node)
          copyTree.children[nodeIndex] = node
        } else {
          arrOfNodes.map((node) => editChildLabel(node.children))
        }
      }
      editChildLabel(copyTree.children)
    }

    setTree(copyTree)
  }

  return (
    <TreeContext.Provider value={{ tree, addNode, removeNode, editLabel }}>
      <main className='main'>
        <Navbar treeViewRef={treeViewRef} />
        <TreeViewer treeViewRef={treeViewRef} />
      </main>
    </TreeContext.Provider>
  );
}

export default App;
