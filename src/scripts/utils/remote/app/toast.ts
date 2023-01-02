// @ts-nocheck
const tst = new Notyf({
    duration: 3000,
    ripple: true,
    dismissible: true,
    types: [
        {
            type: 'success',
            background: '#007E50',
            icon: {
                className: 'material-symbols-outlined',
                tagName: 'i',
                text: 'check_circle',
                color: 'white',
            },
        },
        {
            type: 'info',
            background: '#0469E3',
            icon: {
                className: 'material-symbols-outlined',
                tagName: 'i',
                text: 'info',
                color: 'white',
            },
        },
        {
            type: 'warning',
            background: 'orange',
            icon: {
                className: 'material-symbols-outlined',
                tagName: 'i',
                text: 'warning',
                color: 'white',
            },
        },
        {
            type: 'error',
            background: '#BB0202',
            icon: {
                className: 'material-symbols-outlined',
                tagName: 'i',
                text: 'error',
                color: 'white',
            },
        },
    ],
});

const toast = {
    success: (string: string) => {
        return tst.open({
            type: 'success',
            message: string,
        });
    },
    info: (string: string) => {
        return tst.open({
            type: 'info',
            message: string,
        });
    },
    warning: (string: string) => {
        return tst.open({
            type: 'warning',
            message: string,
        });
    },
    error: (string: string) => {
        return tst.open({
            type: 'error',
            message: string,
        });
    },
};
