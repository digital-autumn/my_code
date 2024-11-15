#include <string>
#include <iostream>
#include <fstream>
#include "pagerankstructs.h"
#include "stringintmap.h"
using namespace std;

void invertedIndex(Word * wordArray, Page * pageArray, StringIntMap & wordTable, int pSize)
{
	for (int i = 0; i < pSize; i++){
		Word * temp = pageArray[i].words;
		while(temp != NULL) {
			int index = wordTable[temp->eWord];
			wordArray[index].url = new Page(pageArray[i].webLink, wordArray[index].url);
			temp = temp->next;
		}
	}
}

void gPageRank(Page pageArray *, int pSize, StringIntMap & pageI)
{
	for (int i =0; i < pSize; i++)
		pageArray[i].gWeight = 1.0 / pSize;

	for (int p = 0; p < 50; p++){
		cout << "Iterations: "<< p+1<<'\n';
		for (int k = 0; k < pSize; k++)
			pageArray[k].g_New_Weight = 0.1 / pSize;

			for (int y = 0; y < pSize; y++){
			Link * temp = pageArray[y].links;
				for (int j = 0; j < pageArray[y].count; j++){
					int i = pageI[temp->eLink];
					pageArray[i].g_New_Weight = pageArray[i].g_New_Weight + (0.9 * pageArray[y].gWeight / pageArray[y].count);
					temp = temp->next;
				}
			}

			for (int h = 0; h < pSize; h++)
				pageArray[h].gWeight = pageArray[h].g_New_Weight;
	}
}


int main(void){
	ifstream fin;
	string s;

	StringIntMap pageIndex;
	StringIntMap wordIndex;
	StringIntMap testIndex;

	int i = -1;
	int k = 0;
	int testWordCount = 0;
	int pageCount = 0;
	int wordCount = 0;
	string hyperLink = "http://";

	fin.open("webpages.txt");
	while (fin >> s){
		if ("NEWPAGE" == s){
			pageCount++;
			fin >> s;
			pageIndex.insert(s);
			}
		}
	fin.close();


	fin.open("webpages.txt");
	while (fin >> s){
		if (s.substr(0,7) != hyperLink && s != "NEWPAGE" && !testIndex.find(s)){
			testIndex[s] = testWordCount;
			wordCount++;
			testWordCount++;
		}
	}
	fin.close();

	//creates a word table
	Word * wordArray = new Word [wordCount];
	fin.open("webpages.txt");
	while (fin >> s){
		if (s.substr(0,7) != hyperLink && s != "NEWPAGE" && !wordIndex.find(s)){
			wordArray[k].eWord = s;
			wordIndex[s] = k;
			k++;
		}
	}
	fin.close();


	Page * webPages = new Page[pageCount];
	fin.open("webpages.txt");
	while (fin >> s){
		if (s == "NEWPAGE"){
			//fin >> s takes the link that comes right after NEWPAGE
			i++;
			fin >> s;
			webPages[i].webLink = s;
			pageIndex[s] = i;
			//input next string from file so that it can be checked for being a link
			//other than the webpage link
			fin >>s;
		}

		if (pageIndex.find(s))
			{
				webPages[i].links = new Link(s, webPages[i].links);
				webPages[i].count+=1;
			}

		if (s.substr(0,7) != hyperLink)
			webPages[i].words = new Word(s, webPages[i].words);
	}
	fin.close();

	invertedIndex(wordArray, webPages, wordIndex, pageCount);
	gPageRank(webPages, pageCount, pageIndex);

	bool search = true;
	while(search){
		string userInput;
		cout<< "Digital Autumn Search Engine: "<<'\n';
		cin >> userInput;
		int index = wordIndex[userInput];
		Page * tempUrl;
		for (tempUrl = wordArray[index].url; tempUrl != NULL; tempUrl = tempUrl->next)
		{
			int pIndex = pageIndex[tempUrl->webLink];
			cout <<(int)(webPages[pIndex].gWeight*(100 * pageCount))<<"  "<< tempUrl->webLink<<'\n';
		}
		string userChoice;
		cout << "Do you wish to continue search: Pick y for Yes and any other key for No: "<<'\n';
		cin >> userChoice;
		search = (userChoice == "y");
	}

	return 0;
}
