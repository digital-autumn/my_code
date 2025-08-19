package Iter;
import java.util.Arrays;

public class ArrayListImpl <T> implements IList <T>{

   private int size, length;
   private T [] list;

   /**
    * Default constructor creates an array
    * initial length 10.
    */
   @SuppressWarnings("unchecked")
   ArrayListImpl(){
      this.length = 10;
      this.size = 0;
      this.list = (T[]) new Object[this.length];
   }

   @SuppressWarnings("unchecked")
   ArrayListImpl(int length){
      this.length = length;
      this.size = 0;
      this.list = (T[]) new Object[this.length];
   }

   @Override
   public void add(T data) {
      if (size == length)
         increaseSize();

      list[size] = data;
      size++;
   }

   @Override
   public T get(int index) {
      return list[index];
   }

   @Override
   public int size() {
      return size;
   }

   @Override
   public int find(T data) {
      int index = -1;

      for(int i = 0; i < size; i++)
         if (list[i].equals(data))
            return i;

      return index;
   }

   @Override
   public void findRemove(T data) {
      remove(find(data));
      size--;
   }

   @Override
   public void remove(int index) {
      if (index > size-1 || index < 0)
         return;

      list[index] = null;

      for(int i = index; i < size; i++)
         list[i] = list[i+1];

      size--;
   }

   @Override
   public void clear() {
      for(int i = 0; i < size; i++)
         list[i] = null;
   }

   @Override
   public void print() {
      for(int i = 0; i < size; i++)
         System.out.println(list[i]+" ");
   }

   private void increaseSize(){
      length*=2;
      list = Arrays.copyOf(list, length);
   }
}
