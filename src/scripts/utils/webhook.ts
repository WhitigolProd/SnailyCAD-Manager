const { Webhook, MessageBuilder } = require('discord-webhook-nodejs');

const webhooks = {
    online: () => {
        if (!storage('wh_url').read()) {
            log('No webhook URL found, skipping webhook...', 'warning');
            toast.warning('No webhook URL found, skipping webhook...');
            return;
        }
        const title = () => {
            if (
                !storage('wh_OnlineTitle').read() ||
                storage('wh_OnlineTitle').read() === ''
            ) {
                return '🟢 Online';
            } else {
                return storage('wh_OnlineTitle').read();
            }
        };
        const desc = () => {
            if (
                !storage('wh_OnlineDesc').read() ||
                storage('wh_OnlineDesc').read() === ''
            ) {
                return 'The CAD is now online.';
            } else {
                return storage('wh_OnlineDesc').read();
            }
        };
        const embed = new MessageBuilder()
            .setTitle(title())
            .setDescription(desc())
            .setColor('#00ff00')
            .setTimestamp()
            .setFooter('Status update sent from SnailyCAD Manager');
        const webhook = new Webhook(storage('wh_url').read());
        if (storage('wh_OnlineEnabled').read() === 'true') {
            webhook.send(embed);
        }
    },
    offline: () => {
        if (!storage('wh_url').read()) {
            log('No webhook URL found, skipping webhook...', 'warning');
            toast.warning('No webhook URL found, skipping webhook...');
            return;
        }
        const title = () => {
            if (
                !storage('wh_OfflineTitle').read() ||
                storage('wh_OfflineTitle').read() === ''
            ) {
                return '🔴 Offline';
            } else {
                return storage('wh_OfflineTitle').read();
            }
        };
        const desc = () => {
            if (
                !storage('wh_OfflineDesc').read() ||
                storage('wh_OfflineDesc').read() === ''
            ) {
                return 'The CAD is now offline.';
            } else {
                return storage('wh_OfflineDesc').read();
            }
        };
        const embed = new MessageBuilder()
            .setTitle(title())
            .setDescription(desc())
            .setColor('#ff0000')
            .setTimestamp()
            .setFooter('Status update sent from SnailyCAD Manager');
        const webhook = new Webhook(storage('wh_url').read());
        if (storage('wh_OnlineEnabled').read() === 'true') {
            webhook.send(embed);
        }
    },
    settings: {
        load: () => {
            // reset form
            $('#webhookURL').val('');
            $('#wh_group_online').addClass('hidden');
            $('#wh_group_offline').addClass('hidden');
            $('#onlineToggle').prop('checked', false);
            $('#offlineToggle').prop('checked', false);
            $('#onlineTitle').val('');
            $('#onlineDesc').val('');
            $('#offlineTitle').val('');
            $('#offlineDesc').val('');

            if (storage('wh_url').read()) {
                $('#webhookURL').val(storage('wh_url').read());
            }

            if (storage('wh_OnlineEnabled').read() === 'true') {
                $('#wh_group_online').removeClass('hidden');
                // Check the Online Toggle
                $('#onlineToggle').prop('checked', true);

                // Load Values
                $('#onlineTitle').val(storage('wh_OnlineTitle').read());
                $('#onlineDesc').val(storage('wh_OnlineDesc').read());
            }

            if (storage('wh_OfflineEnabled').read() === 'true') {
                $('#wh_group_offline').removeClass('hidden');
                // Check the Online Toggle
                $('#offlineToggle').prop('checked', true);

                // Load Values
                $('#offlineTitle').val(storage('wh_OfflineTitle').read());
                $('#offlineDesc').val(storage('wh_OfflineDesc').read());
            }
        },
        save: () => {
            if ($('#webhookURL').val() === '') {
                storage('wh_url').write('');
                storage('wh_OnlineEnabled').write('false');
                storage('wh_OfflineEnabled').write('false');
                return;
            }

            const webhookURL: any = $('#webhookURL').val();
            storage('wh_url').write(webhookURL);

            if ($('#onlineToggle').is(':checked')) {
                const onlineTitle: any = $('#onlineTitle').val();
                const onlineDesc: any = $('#onlineDesc').val();
                storage('wh_OnlineEnabled').write('true');
                storage('wh_OnlineTitle').write(onlineTitle);
                storage('wh_OnlineDesc').write(onlineDesc);
            } else {
                storage('wh_OnlineEnabled').write('false');
            }

            if ($('#offlineToggle').is(':checked')) {
                const offlineTitle: any = $('#offlineTitle').val();
                const offlineDesc: any = $('#offlineDesc').val();
                storage('wh_OfflineEnabled').write('true');
                storage('wh_OfflineTitle').write(offlineTitle);
                storage('wh_OfflineDesc').write(offlineDesc);
            } else {
                storage('wh_OfflineEnabled').write('false');
            }
        },
    },
};

$(document).on('click', '#onlineToggle', () => {
    if ($('#onlineToggle').is(':checked')) {
        $('#wh_group_online').removeClass('hidden');
    } else {
        $('#wh_group_online').addClass('hidden');
    }
});

$(document).on('click', '#offlineToggle', () => {
    if ($('#offlineToggle').is(':checked')) {
        $('#wh_group_offline').removeClass('hidden');
    } else {
        $('#wh_group_offline').addClass('hidden');
    }
});

// #webhook_settings_form save submit
$(document).on('submit', '#webhook_settings_form', (e) => {
    e.preventDefault();
    webhooks.settings.save();
    toast.success('Saved webhook settings!');
    modal('#webhook_settings').close();
});
