package Iter;

public interface IList <T> {
    public void remove(int index);
    public T get(int index);
    public int size();
    public void add(T data);
    public void clear();
    public void print();
}
