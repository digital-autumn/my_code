package Iter;

public class LinkedListImpl <T> implements IList <T>{
    private Node head, tail;
    private int size;

    private class Node{
        protected T data;
        protected Node next, prev;

        Node(T data){
            this.data = data;
        }
    }
    public LinkedListImpl(){
        this.size = 0;
    }

    @Override
    public void remove(int index) {
        int count = 0;

        if (count == index){
            head = head.next;
            size--;
            return;
        }

        if (index == size-1){
            removeTail();
            size--;
            return;
        }

        for (Node node = head; node != null; node = node.next){
            if (count == index-1){
                node.next = node.next.next;
                size--;
                return;
            }
        }
    }

    @Override
    public T get (int index) {
        int count = 0;

        if (index > size-1)
            return null;

        for (Node node = head; node != null; node = node.next){
            if (count == index)
                return node.data;
            count++;
        }
        return null;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public void add(T data) {
        if (head == null){
            head = new Node(data);
            tail = head;
            size++;
            return;
        }

        tail.next = new Node(data);
        size++;
    }

    @Override
    public void clear() {
        head = null;
        tail = null;
        size = 0;
    }

    @Override
    public void print() {
        for (Node node = head; node != null; node = node.next)
            System.out.print(node.data+" ");
    }

    private void removeTail() {
        for (Node node = head; node != null; node = node.next){
            if (node.next.next == null) {
                tail = node.next;
                return;
            }
        }
    }
}
