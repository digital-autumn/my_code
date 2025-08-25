package Map;
import Iter.IList;

public interface IMap <K, V> {
   /**
    *
    * @param key
    * @param value
    */
   public void put(K key, V value);

   /**
    *
    * @param key
    * @return
    */
   public IList get(K key);
   /**
    *
    * @param key
    * @return
    */
   public int hash(K key);

   /**
    *
    * @return
    */
   public int length();
}
