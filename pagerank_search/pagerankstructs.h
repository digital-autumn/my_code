#ifndef PAGERANKSTRUCTS_H
#define PAGERANKSTRUCTS_H
using namespace std;
#include "stringintmap.h"

struct Page{
	string webLink;
	double gWeight;
	double g_New_Weight;
	Page * next; 
	int count;
	struct Link * links;
	struct Word * words;
	Page(){
		next = NULL;
		links = NULL;
		words = NULL;
		count = 0;
		}
		
	Page (string wLink, Page * n){
		webLink = wLink;
		next = n;
		count = 0;
	}
};

struct Link{
	string eLink;
	Link * next;
	Link (){
		next = NULL;
	}
	
	Link (string link, Link * n){
		eLink = link;
		next = n;
	}
};

struct Word{
	string eWord;
	Word * next;
	struct Page * url;
	Word(){
		next = NULL;
		url = NULL;
	}
	
	Word (string word, Word * n){
		eWord = word;
		next = n;
	}
};

string subString(string);
void invertedIndex(Word, Page, StringIntMap &, int);
void gPageRank(Page, int, StringIntMap &);

#endif
