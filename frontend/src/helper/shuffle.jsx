function Shuffle(questions){
    let shuffledQuestions = [];
    let shuffledOptions = [];
    
    try{
        questions.forEach((question) => {
            const option_correct = {option: question.option_correct, correct: true};
            shuffledOptions.push(option_correct);
    
            const option_wrong_1 = {option: question.option_wrong_1, correct: false};
            shuffledOptions.push(option_wrong_1);
    
            if(question.option_wrong_2 != null){
                const option_wrong_2 = {option: question.option_wrong_2, correct: false};
                shuffledOptions.push(option_wrong_2);
            }
    
            if(question.option_wrong_3 != null){
                const option_wrong_3 = {option: question.option_wrong_3, correct: false};
                shuffledOptions.push(option_wrong_3);
            }
    
            shuffledOptions = shuffledOptions
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
    
            shuffledQuestions.push({title: question.title, options: shuffledOptions});
            shuffledOptions = [];
        })
    }catch(err){
        console.log("Error occured at shuffling options.");
        console.log(err);
    }

    return shuffledQuestions;
}

export default Shuffle;