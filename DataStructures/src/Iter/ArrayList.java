package Iter;
import java.util.Arrays;

public class ArrayList<E> implements IList <E> {

   private int size, length;
   private E[] list;

   /**
    * Default constructor creates an array
    * initial length 10.
    */
   @SuppressWarnings("unchecked")
   public ArrayList() {
      this.length = 10;
      this.size = 0;
      this.list = (E[]) new Object[this.length];
   }

   @SuppressWarnings("unchecked")
   public ArrayList(int length) {
      this.length = length;
      this.size = 0;
      this.list = (E[]) new Object[this.length];
   }

   @Override
   public void add(E data) {
      if (size == length)
         increaseLength();
      list[size] = data;
      size++;
   }

   @Override
   public void add(int index, E data){
      indexBoundsCheck(index);
      list[index] = data;
   }

   @Override
   public E get(int index) {
      indexBoundsCheck(index);
      return list[index];
   }

   @Override
   public int size() {
      return size;
   }

   @Override
   public int find(E data) {
      int index = -1;

      for (int i = 0; i < size; i++)
         if (list[i].equals(data))
            return i;

      return index;
   }

   @Override
   public void findRemove(E data) {
      remove(find(data));
   }

   @Override
   public void remove(int index) {
      indexBoundsCheck(index);
      shift(index);
      list[size-1] = null;
      size--;
   }

   @Override
   public void clear() {
      for (int i = 0; i < size; i++)
         list[i] = null;
      size = 0;
   }

   @Override
   public void print() {
      if (size == 0) {
         System.out.println("Array List is empty.");
         return;
      }

      for (int i = 0; i < size; i++)
         System.out.print(list[i]+" ");
   }

   private void shift(int index){
      for (int i = index; i < size; i++)
         list[i] = list[i+1];
   }

   private void increaseLength() {
      length*=2;
      list = Arrays.copyOf(list, length);
   }

   private void indexBoundsCheck(int index){
      if (index > size-1 || index < 0)
         throw new IndexOutOfBoundsException();
   }
}
