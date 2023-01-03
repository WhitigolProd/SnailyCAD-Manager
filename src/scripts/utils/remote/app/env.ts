// @ts-nocheck

// Initialize the Ace editor
let editor = ace.edit('editor');
editor.setTheme('ace/theme/twilight');
editor.session.setMode('ace/mode/dot');

const openEnvEditor = async () => {
    try {
        $('#edit_env_btn .load').attr('aria-busy', 'true');
        const env = await $.get('/api/env/read');
        editor.setValue(env, -1);
        $('#env_editor_window').attr('open', true);
        $('#edit_env_btn .load').attr('aria-busy', 'false');
    } catch (e) {
        toast.error('Failed to fetch env file.');
        $('#edit_env_btn .load').attr('aria-busy', 'false');
    }
};

const saveEnvEditor = async () => {
    try {
        $('#save_env_btn .load').attr('aria-busy', 'true');
        await $.post('/api/env/save', {
            env: editor.getValue(),
        });
        toast.success('Saved env file.');
        $('#env_editor_window').attr('open', false);
        $('#save_env_btn .load').attr('aria-busy', 'false');
    } catch (e) {
        toast.error('Failed to save env file.');
        $('#save_env_btn .load').attr('aria-busy', 'false');
    }
};

const closeEnvEditor = () => {
    $('#env_editor_window').attr('open', false);
    toast.info('ENV Editor closed. Changes were not saved.');
};
