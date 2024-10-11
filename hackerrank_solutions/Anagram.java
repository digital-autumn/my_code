import java.util.Scanner;

public class Anagram
{
    public static boolean isAnagram(String a, String b)
    {
        a = a.toLowerCase();
        b = b.toLowerCase();

        if (a.length() != b.length())
            return false;

        for (int i = 0; i < a.length(); i++)
        {
            String s = String.valueOf(a.charAt(i));
            if (b.contains(s))
                b = b.replaceFirst(s, "");

            else
                return false;
        }

        return b.isEmpty();
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        String word1, word2;

        System.out.println("Welcome to the Anagram Validate. ");
        System.out.print("Enter first word: ");
        word1 = scan.next();

        System.out.println();

        System.out.print("Enter second word: ");
        word2 = scan.next();

        System.out.println(isAnagram(word1, word2) ? "This word is an Anagram." : "This word is not an Anagram.");
        //System.out.println("The two words being anagrams is: "+isAnagram(word1, word2));
    }
}