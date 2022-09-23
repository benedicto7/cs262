1. What React construct is used to implement separate pages of an application (cf. separate webpages on the Web)?
createNativeStackNavigator();

2. What is the React Navigation concept that is analogous to a URL/URI on the Web?
navigation.navigate() and component={}

3. The onPress event handler for the home screen component is specified as () => navigation.navigate('Details'). 
Can we just say navigation.navigate('Details')? Why or why not?
No, because we are passing an argument. Unless the function uses default parameters, then yes,

4. Explain how the hard-coded movie list is presented as a list of titles on the homepage.
presented through flatlist that uses touchableopacity to go to the page that was clicked. also uses renderitem to takes in which index to output

5. Explain how the details screen presents the details of a single movie.
presents the details of a single movie one-by-one: title, rating, description

