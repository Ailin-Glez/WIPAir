export class Utils {
    
    static getRandomValue(arr: string[]): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}