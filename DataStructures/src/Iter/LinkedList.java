package Iter;

public class LinkedList <E> implements IList <E> {

   private class Node {

      E data;
      Node next, prev;

      Node(E data){
         this.data = data;
      }
   }

   private Node head, tail;
   private int size;

   public LinkedList(){
      size = 0;
   }

   @Override
   public void add(E data) {
      if (head == null){
         head = new Node(data);
         tail = head;
         size++;
         return;
      }

      tail.next = new Node(data);
      tail.next.prev = tail;
      tail = tail.next;
      size++;
   }

   @Override
   public void add(int index, E data) {}

   @Override
   public E get(int index) {
      indexBoundsCheck(index);

      Node current = head;
      for (int i = 0; i < index; i++)
         current = current.next;

      return current.data;
   }

   @Override
   public int size() {
      return size;
   }

   @Override
   public int find(E data) {
      int index = -1;

      Node current = head;
      for (int i = 0; i < size; i++){
         if (current.data.equals(data))
            return i;
         current = current.next;
      }

      return index;
   }

   @Override
   public void findRemove(E data) {
      remove(find(data));
   }

   @Override
   public void remove(int index) {
      indexBoundsCheck(index);

      Node current = head;

      if(index == 0){
         head = current.next;
         size--;
         return;
      }

      for (int i = 0; i < size; i++){
         if (i == index-1) {
            current.next = current.next.next;
            size--;
            return;
         }

         current = current.next;
      }
   }

   @Override
   public boolean isEmpty() {
      return head == null && tail == null;
   }

   @Override
   public void clear() {
      head = null;
      tail = null;
      size = 0;
   }

   @Override
   public void print() {
      Node current = head;
      for (int i = 0; i < size; i++){
         System.out.println(current.data+" ");
         current = current.next;
      }
   }

   public void printReverse(){
      Node current = tail;
      for (int i = 0; i < size; i++){
         System.out.println(current.data+" ");
         current = current.prev;
      }
   }

   private void indexBoundsCheck(int index){
      if (index > size-1 || index < 0)
         throw new IndexOutOfBoundsException();
   }
}
