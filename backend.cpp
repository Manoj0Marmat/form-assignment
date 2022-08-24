// all validation logics in c++
// this logic is converted into js in this project
// this file is not integrated in project
//ALERT this file have no role in this project
// just for reference

#include <bits/stdc++.h>
using namespace std;

// checking for name is valid
bool nameValidation(string name){
	int n = name.length();
	int wordCount=1;
	bool valChar = 1;
	int charCount = 1;
	int i;
    for (int i = 0; i < n; i++)
    {
        if (name[i]==' '){
			//checking word's char is less than 4 
			if (charCount-1<4) valChar = 0;
			++wordCount;
			charCount = 1;
		}else ++charCount;
    }
    
	if (wordCount >= 2 && valChar) return 1;

	return 0;
}

// checking element is in string
bool checkExist(string email, char a){
	int n = email.length();
	int i;
	for (i = n-1; i >= 0; --i)
	{
		if (email[i]==a) break;
	}
	if (i<=0) return 0;

	return 1;
}

bool emailValidation(string email){
	int n = email.length();
	bool checkDot = checkExist(email, '.');
	bool checkAt = checkExist(email, '@');
	// @ and . not in string then wrong email
	if (!(checkDot && checkAt)) return 0;
	for (int i = n-1; i >= 0 ; --i)
	{
		if (email[i]=='.')
		{
			if (n-i-1<2) return 0;
			int j = i-1;
			// checking distance between . and @ 
			// bcz email have domain name
			while(email[j]!='@' && j>0 ) --j;
			//domain name must have more than 2 char
			// always use @ before . from reverse side
			// . should not at position 0
			if (i-j<2 || i<=j || j==0) return 0;
			break;
		}
	}

	return 1;
}

bool panValidation(string pan){
	int n = pan.length();
	// first 4 char
	bool checkChar = 1;
	// second 4 num
	bool checkNum = 1;
	// third last char
	bool checkLastChar = 1;
	for (int i = 0; i <n ; ++i)
	{
		if (i<=4)
		{
			if ( !(pan[i]>='A' && pan[i]<='Z') ) checkChar = 0;

		}else if(i<=8){
			if ( !(pan[i]>='0' && pan[i]<='9') )checkNum = 0;

		}else if(i<=9){
			if ( !(pan[i]>='A' && pan[i]<='Z') ) checkLastChar = 0;
		}
	}
	if (checkChar && checkNum && checkLastChar) return 1;

	return 0;
}

// checking the amount is valid
bool amountValidation( int amount){
	if (amount > 0 && amount <= 999999999) return 1;

	return 0;
}

// giving the single digit int into word
string getOneDigitWord(int i){
	if (i == 0) return "zero";
	else if(i == 1) return "one";
	else if(i == 2) return "two";
	else if(i == 3) return "three";
	else if(i == 4) return "four";
	else if(i == 5) return "five";
	else if(i == 6) return "six";
	else if(i == 7) return "seven";
	else if(i == 8) return "eight";
	else return "nine";
}
// giving the double digit int into word
string getTwoDigitWord(int i){
	if (i==10) return "ten";
	else if(i == 11) return "eleven";
	else if(i == 12) return "twelve";
	else if(i == 13) return "thirteen";
	else if(i == 15) return "fifteen";
	else if( (i== 14 || (i>=16 && i<=19) ) && i!=18 ){
		string s = "";
		s += getOneDigitWord(i%10);
		s += "teen";
		return s;
	}else if(i == 18) return "eighteen";
	else if(i == 20) return "twenty";
	else if(i == 30) return "thirty";
	else if(i == 40) return "fourty";
	else if(i == 50) return "fifty";
	else if(i == 60) return "sixty";
	else if(i == 70) return "seventy";
	else if(i == 80) return "eighty";
	else if(i == 90) return "ninety"; 
	else{
		string s = "";
		int temp = i%10;
		s+=getTwoDigitWord(i-temp);
		s+=" ";
		s+=getOneDigitWord(temp);
		return s;
	}
}

// giving the hole int number in word
string numToWord(int amount){
	string s = "";
	if(amount<=9){
		s+=getOneDigitWord(amount);
	}
	else if (amount>9)
	{
		s += getTwoDigitWord(amount%100);
	}else if (amount > 99){
		int temp = amount/100;
		s += getOneDigitWord(temp);
		s += " hundread ";
		s += getTwoDigitWord(amount%100);
	}
	return s;
}
// geving the hole number in word including hundreads lakhs thounsand's upto crore
string convertToWord(int amount){
	int temp = amount;
	int count=0;
	//length of amount
	while(temp){
		++count;
		temp/=10;
	}
	int size = 1;
	if (amount>99) size = count/2+1;
		
	int arr[size];
	if (amount>99){
		// 113924 into 1,13,924
		for (int i = 0; i < size; ++i){
			if (i<2) {
				arr[i] = amount%100;
				amount/=100;
				++i;
				arr[i] = amount%10;
				amount/=10;
			}else{
				arr[i] = amount%100;
				amount/=100;
			}
		}		
	}else{
		// 49 and 9 remain same
		arr[0] = amount;
	}

	string numeralArr[9] = {"", "hundread", "thousand", "lakh", "crore"};

	string final = "";
	if (size>1)
	{
		for (int i = size-1; i >= 0; --i)
		{
			if (arr[i]>0)
			{
				final+=numToWord(arr[i]);
				final+=" ";
				final+=numeralArr[i];
				final+=" ";
			}
			
		}
	}else{
		final+=numToWord(arr[0]);
	}

	return final;
}
// gerating 4 random digits 
void generateCaptcha(){
	srand(time(0));
	int number = rand()%10000;
	int ans=0;
	int question = number;
	while(number){
		if ((number%10)%2==0)
		{
			ans+=number%10;
		}
		number/=10;
	}
}

int main(){
	
	string name, email, pan;
	int amount;
	cin>>email>>pan>>amount;
	cin.ignore();
	getline(cin, name);

	string wordamount = convertToWord(amount);
	
	bool checkName = nameValidation(name);
	bool checkEmail = emailValidation(email);
	bool checkPan = panValidation(pan);
	bool checkAmount = amountValidation(amount);

	generateCaptcha();

    cout << wordamount << endl;
    if (checkName && checkEmail && checkPan && checkAmount)
    {
		cout<<"Everything is valid you can submit ";
	}else{
		cout<<"Error Invalid Data";
	}

	return 0;
}
// input's for test

// manoj76@gmail.com
// ABCWE1234F
// 65001
// manoj marmat