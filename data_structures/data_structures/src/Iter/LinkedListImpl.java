package Iter;

public class LinkedListImpl <T> implements IList <T> {

   private class Node {

      T data;
      Node next;

      Node(T data){
         this.data = data;
      }
   }

   private Node head, tail;
   private int size;

   public LinkedListImpl(){
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
      tail = tail.next;
      size++;
   }

   @Override
   public T get(int index) {
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
   public int find(T data) {
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
   public void findRemove(T data) {
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
   public void clear() {
      head = null;
      tail = null;
      size = 0;
   }

   @Override
   public void print() {
      Node current = head;
      for (int i = 0; i < size; i++){
         System.out.print(current.data+" ");
         current = current.next;
      }
   }

   private void indexBoundsCheck(int index){
      if (index > size-1 || index < 0)
         throw new IndexOutOfBoundsException();
   }
}
