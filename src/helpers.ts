import { DEVICE_SIZES } from './types';

export function deviceSize(width?: number, provided_sizes?:object) {
    //pick smallest available size!? 
    
    const devSizeArray = Object.values(DEVICE_SIZES);
    const pickSmallest = ( size )=>{
        const index = devSizeArray.indexOf( size );

        for(let i = index; i < devSizeArray.length; i++){

            if ( provided_sizes[ devSizeArray[i] ] ) {
                return devSizeArray[i];
            }

        }

        return undefined;

    }

    if (width > 1200) {
        return pickSmallest( DEVICE_SIZES.EXTRA_LARGE_DEVICE );        
    }
    if (width > 992) {
        return pickSmallest( DEVICE_SIZES.LARGE_DEVICE );
    }
    if (width > 768) {
        return pickSmallest( DEVICE_SIZES.MEDIUM_DEVICE );
    }
    if (width > 540) {
        return pickSmallest( DEVICE_SIZES.SMALL_DEVICE );
    }

    return pickSmallest( DEVICE_SIZES.EXTRA_SMALL_DEVICE );
}