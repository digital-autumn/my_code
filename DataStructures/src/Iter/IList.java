package Iter;

public interface IList <E> {
   /**
    * Method adds generic data to end of list.
    * @param data Generic Object
    */
   public void add(E data);

   /**
    *
    * @param data generic data to add to the list.
    * @param index the position in the list were data will
    *              be added.
    */
   public void add(int index, E data);

   /**
    * Method returns generic data type at index passed to it.
    * @param index position to get data from list.
    * @return generic object type from list.
    */
   public E get(int index);

   /**
    * @return size of list
    */
   public int size();

   /**
    * Finds first identical object in list that matches param
    * passed to the method.
    * @param data Generic object passed to method
    * @return index of element in the list.
    */
   public int find(E data);

   /**
    * Removes the first object that matches the param passed into
    * method from the List.
    * @param data Generic object passed to method
    */
   public void findRemove(E data);

   /**
    *
    * @param index index of element to be removed from the list
    */
   public void remove(int index);

   /**
    *
    * @return boolean value is returned if list is empty.
    */
   public boolean isEmpty();

   /**
    * Removes every generic object in the list.
    */
   public void clear();

   /**
    * Prints all the contents of the list.
    */
   public void print();

   public void printReverse();
}
