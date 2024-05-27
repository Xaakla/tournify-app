export default function convertUltilizationRate(rate: number = 0) {
    if (rate >= 0 && rate <= 9) rate = 0;
    else if (rate >= 10 && rate <= 19) rate = 0.1;
    else if (rate >= 20 && rate <= 29) rate = 0.2;
    else if (rate >= 30 && rate <= 39) rate = 0.3;
    else if (rate >= 40 && rate <= 49) rate = 0.4;
    else if (rate >= 50 && rate <= 59) rate = 0.5;
    else if (rate >= 60 && rate <= 69) rate = 0.6;
    else if (rate >= 70 && rate <= 79) rate = 0.7;
    else if (rate >= 80 && rate <= 89) rate = 0.8;
    else if (rate >= 90 && rate <= 99) rate = 0.9;
    else rate = 1;

    return rate;
}