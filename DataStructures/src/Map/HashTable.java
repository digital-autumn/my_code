package Map;
import Iter.IList;
import Iter.LinkedList;
import java.util.Arrays;
import java.util.stream.IntStream;

public class HashTable <K, V> implements IMap <K, V> {

   private int length, size;
   private IList [] table;

   public HashTable(){
      this.length = 10000;
      size = 0;
      initializeTable();
   }

   public HashTable(int length){
      this.length = length;
      size = 0;
      initializeTable();
   }

   @Override
   public void put(K key, V value) {
      table[hash(key)].add(value);
   }

   @Override
   public IList get(K key) {
      return table[hash(key)];
   }

   @Override
   public int hash(K key) {
      return Math.abs(key.hashCode() % length);
   }

   @Override
   public void delete(K key) {
      table[hash(key)] = null;
      size--;
   }

   @Override
   public void clear() {

   }

   @Override
   public boolean isEmpty() {
      return Arrays.stream(table).allMatch(i -> i == null);
   }

   @Override
   public boolean isEmpty(K key) {
      return table[hash(key)].isEmpty();
   }

   @Override
   public int length() {
      return length;
   }

   private void initializeTable() {
      table = IntStream.range(size, length)
                       .mapToObj(i -> new LinkedList())
                       .toArray(LinkedList[]::new);
   }
}
