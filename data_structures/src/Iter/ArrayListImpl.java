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
   public ArrayListImpl() {
      this.length = 10;
      this.size = 0;
      this.list = (T[]) new Object[this.length];
   }

   @SuppressWarnings("unchecked")
   public ArrayListImpl(int length) {
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
      indexBoundsCheck(index);
      return list[index];
   }

   @Override
   public int size() {
      return size;
   }

   @Override
   public int find(T data) {
      int index = -1;

      for (int i = 0; i < size; i++)
         if (list[i].equals(data))
            return i;

      return index;
   }

   @Override
   public void findRemove(T data) {
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
   }

   @Override
   public void print() {
      for (int i = 0; i < size; i++)
         System.out.print(list[i]+" ");
   }

   private void shift(int index){
      for (int i = index; i < size; i++)
         list[i] = list[i+1];
   }

   private void increaseSize() {
      length*=2;
      list = Arrays.copyOf(list, length);
   }

   private void indexBoundsCheck(int index){
      if (index > size-1 || index < 0)
         throw new IndexOutOfBoundsException();
   }
}
