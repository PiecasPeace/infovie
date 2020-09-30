export const RegularRegex: RegExp = new RegExp(/([^\,\-\:\.|Vol.\[\+]*)/)
export const BlurayRegex: RegExp = new RegExp(/([^]*)/)
export const DVDRegex: RegExp = new RegExp(/([^,|:|-]*)/)
export const VolumeRegex: RegExp = new RegExp(/([^,|:|-]*)/)

const IRegex = [RegularRegex, BlurayRegex, DVDRegex, VolumeRegex];

for (let i = 0; i < IRegex.length; i++) {
    if (IRegex[i] !== undefined || null) {
        IRegex[i];
    } else {
        IRegex[i++];
    }
}