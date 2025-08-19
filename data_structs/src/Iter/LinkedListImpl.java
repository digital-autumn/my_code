package Iter;

public class LinkedListImpl <T> implements IList <T>{

   private class Node {
      T data;
      Node next;

      Node(T data){
         this.data = data;
      }
   }

   private Node head, tail;
   private int size;

   LinkedListImpl(){
      size = 0;
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
   public T get(int index) {

      if (index > size-1 || index < 0)
         throw new IndexOutOfBoundsException();

      int count = 0;

      Node node = head;
      for (int i = 0; i < index; i++)
         node = node.next;

      return node.data;
   }

   @Override
   public int size() {
      return size;
   }

   @Override
   public int find(T data) {
      return -1;
   }

   @Override
   public void findRemove(T data) {

   }

   @Override
   public void remove(int index) {

   }

   @Override
   public void clear() {
      head = null;
      tail = null;
      size = 0;
   }

   @Override
   public void print() {

   }
}
