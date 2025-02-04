package Iter;

import java.util.Arrays;

public class ArrayListImpl <T> implements IList <T>{

    private int size, length;
    private T [] list;

    public ArrayListImpl(){
        this.length = 10;
        this.size = 0;
        list = (T[]) new Object[length];
    }

    @Override
    public void add(T data) {
        if (size == length)
            increaseSize();

        list[size] = data;
        size++;
    }

    @Override
    public void clear() {
        for (int i = 0; i < size; i++)
            list[i] = null;
        size = 0;
    }

    @Override
    public void print() {
        for (int i = 0; i < size; i++)
            System.out.print(list[i]+" ");
    }

    @Override
    public void remove(int index) {
        list[index] = null;
        shift(index);
        size--;
    }

    @Override
    public T get(int index) {
        return list[index];
    }

    @Override
    public int size() {
        return size;
    }

    private void increaseSize(){
        length*=1.5;
        list = Arrays.copyOf(list, length);
    }

    private void shift(int index){
        for (int i = index; i < size-1; i++)
            list[i] = list[i+1];
    }
}
