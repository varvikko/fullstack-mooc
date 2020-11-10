export function calculateBmi(height: number, weight: number) {
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Malformatted argument');
    }

    const bmi = weight / Math.pow(height / 100, 2);

    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi <= 17) {
        return 'Severely underweight';
    } else if (bmi <= 18.5) {
        return 'Underweight';
    } else if (bmi <= 25) {
        return 'Normal (healthy weight)';
    } else if (bmi <= 30) {
        return 'Overweight';
    } else if (bmi <= 35) {
        return 'Obese Class I (Moderately obese)';
    } else if (bmi <= 40) {
        return 'Obese Class II (Severely obese)';
    } else {
        return 'Obese Class III (Very severely obese';
    }
}

if (require.main === module) {
    const [height, weight] = process.argv.slice(2);
    console.log(calculateBmi(Number(height), Number(weight)));
}
