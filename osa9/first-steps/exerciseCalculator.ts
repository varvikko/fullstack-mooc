interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export function calculateExercises(days: number[], target: number): Result {
    if (isNaN(target) || days.some(isNaN)) {
        throw new Error('Malformatted argument');
    }

    const average = days.reduce((p, c) => p + c) / days.length;
    let ratingDescription = 'good work';
    let rating = 2;

    if (average < target / 2) {
        ratingDescription = 'could be better';
        rating = 1;
    } else if (average > target * 1.5) {
        ratingDescription = 'you exceeded yourself';
        rating = 3;
    }

    return {
        periodLength: days.length,
        trainingDays: days.filter((day) => day > 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
}

if (require.main === module) {
    const [target, ...days] = process.argv.slice(2);
    console.log(
        calculateExercises(
            days.map((day) => Number(day)),
            Number(target)
        )
    );
}
