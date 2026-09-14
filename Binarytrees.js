class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
    }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root)
    {if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < this.root.val) {
      if (!this.root.left) {
        this.root.left = new Node(val);
      } else {
        this.root.left.insertRecursively(val);
      }
    } else {
      if (!this.root.right) {
        this.root.right = new Node(val);
      } else {
        this.root.right.insertRecursively(val);
      }
    }

    return this;
    }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val)
    { let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined; 
    }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) 
    {current = this.root;
    if (!current) {
      return undefined;
    }
    if (val === current.val) {
      return current;
    } else if (val < current.val) {
      return this.findRecursively(current.left, val);
    } else {
      return this.findRecursively(current.right, val);
    }       
    }
  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder()
    { const result = [];
    const traverse = (node) => {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    if (this.root) {
      traverse(this.root);
    }
    return result; 
    }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() 
    { const result = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    };
    if (this.root) {
      traverse(this.root);
    }
    return result;  
    }
  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder()
    {const result = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    };
    if (this.root) {
      traverse(this.root);
    }
    return result;

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() 
    { const result = [];
    if (!this.root) return result;
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) 
    {let parent = null;
    let current = this.root;

    while (current && current.val !== val) {
      parent = current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (!current) return undefined;

    const removed = new Node(current.val);

    if (!current.left && !current.right) {
      if (!parent) {
        this.root = null;
      } else if (parent.left === current) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.left && !current.right) {
      if (!parent) {
        this.root = current.left;
      } else if (parent.left === current) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (!current.left && current.right) {
      if (!parent) {
        this.root = current.right;
      } else if (parent.left === current) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else {
      let successorParent = current;
      let successor = current.right;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      current.val = successor.val;

      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    return removed;

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() 
    {const height = (node) => {
      if (!node) return 0;
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    const checkBalance = (node) => {
      if (!node) return true;
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return checkBalance(node.left) && checkBalance(node.right);
    };

    return checkBalance(this.root);         
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() 
    { if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    while (current) {
      if (current.left && !current.right) {
        return this.findMax(current.left);
      }
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }


module.exports = BinarySearchTree;