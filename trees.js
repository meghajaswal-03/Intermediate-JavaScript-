// TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let sum = 0; 

    function sumValuesHelper(node) {
        sum += node.val;
        for (let child of node.children) {
            sumValuesHelper(child);
        }
    }

    sumValuesHelper(this.root);
    return sum;
    
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    let count = 0;

    function countEvensHelper(node) {
        if (node.val % 2 === 0) {
            count++;
        }
        for (let child of node.children) {
            countEvensHelper(child);
        }
    }

    countEvensHelper(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let count = 0;

    function numGreaterHelper(node) {
      if (node.val > lowerBound) {
        count++;
      }
      for (let child of node.children) {
        numGreaterHelper(child);
      }
    }

    numGreaterHelper(this.root);
    return count;
  }
}

module.exports = { Tree, TreeNode };
 

/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    function minDepthHelper(node) {
      if (!node.left && !node.right) {
        return 1;
      }
      if (!node.left) {
        return 1 + minDepthHelper(node.right);
      }
      if (!node.right) {
        return 1 + minDepthHelper(node.left);
      }
      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
    }

    return minDepthHelper(this.root);

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
        if (!node.left && !node.right) {
            return 1;
        }
        let leftDepth = node.left ? maxDepthHelper(node.left) : 0;
        let rightDepth = node.right ? maxDepthHelper(node.right) : 0;
        return Math.max(leftDepth, rightDepth) + 1;
    }

    return maxDepthHelper(this.root);

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;

    let maxSum = -Infinity;

    function maxSumHelper(node) {
        if (!node) return 0;

        let leftSum = Math.max(maxSumHelper(node.left), 0);
        let rightSum = Math.max(maxSumHelper(node.right), 0);

        maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

        return node.val + Math.max(leftSum, rightSum);
    }

    maxSumHelper(this.root);
    return maxSum;  

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let closest = null;

    function nextLargerHelper(node) {
        if (node.val > lowerBound && (closest === null || node.val < closest)) {
            closest = node.val;
        }
        if (node.left) nextLargerHelper(node.left);
        if (node.right) nextLargerHelper(node.right);
    }

    nextLargerHelper(this.root);
    return closest;

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findDepthAndParent(node, target, depth = 0, parent = null) {
        if (!node) return null;
        if (node === target) 
            return { depth, parent };
        let leftResult = findDepthAndParent(node.left, target, depth + 1, node);
        if (leftResult) 
            return leftResult;
        return findDepthAndParent(node.right, target, depth + 1, node);
    }
    const node1Info = findDepthAndParent(this.root, node1);
    const node2Info = findDepthAndParent(this.root, node2);

    return (
        node1Info &&
        node2Info &&
        node1Info.depth === node2Info.depth &&
        node1Info.parent !== node2Info.parent
    );

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    const values = [];

    function serializeHelper(node) {
        if (!node) {
            values.push('null');
            return;
        }
        values.push(node.val);
        serializeHelper(node.left);
        serializeHelper(node.right);
    }

    serializeHelper(this.root);
    return values.join(',');

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values = stringTree.split(',');
    let i = 0; 

    function deserializeHelper() {
        if (values[i] === 'null') {
            i++;
            return null;
        }
        const node = new BinaryTreeNode(parseInt(values[i]));
        i++;
        node.left = deserializeHelper();
        node.right = deserializeHelper();
        return node;
    }

    const root = deserializeHelper();
    return new BinaryTree(root);

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (!node || node === node1 || node === node2) return node;

    const left = this.lowestCommonAncestor(node.left, node1, node2);
    const right = this.lowestCommonAncestor(node.right, node1, node2);

    if (left && right) return node;
    return left ? left : right; 
  }
}

module.exports = { BinaryTree, BinaryTreeNode };