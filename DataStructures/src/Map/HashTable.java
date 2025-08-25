package Map;
import Iter.ArrayList;
import Iter.IList;
import Iter.LinkedList;
import java.util.stream.IntStream;

public class HashTable <K, V> implements IMap <K, V> {

   private int length;
   private IList [] hashTable;

   public HashTable(){
      this.length = 1000;
      initializeTable();
   }

   public HashTable(int length){
      this.length = length;
      initializeTable();
   }

   @Override
   public void put(K key, V value) {
      hashTable[hash(key)].add(value);
   }

   @Override
   public IList get(K key) {
      return hashTable[hash(key)];
   }

   @Override
   public int hash(K key) {
      return Math.abs(key.hashCode() % length);
   }

   @Override
   public void delete(K key) {
      hashTable[hash(key)] = null;
   }

   @Override
   public int length() {
      return length;
   }

   private void initializeTable() {
      hashTable = IntStream.range(0, length)
                           .mapToObj(i -> new LinkedList())
                           .toArray(LinkedList[]::new);
   }
}
