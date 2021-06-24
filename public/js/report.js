$(document).ready(function () {
    $("#items").html('');
    $.get('http://localhost:3000/reports/', function (res) {
        var str = '';
        res = JSON.parse(res);
        res.forEach((item) => {
            str += '<table id="table-' + item.id + '" class="tab-main" cellspacing="0" cellpadding="0">\n' +
                '        <tr >\n' +
                '            <td class="id-cls"><span class="label">Id: </span>' + item.id + '</td>\n' +
                '            <td class="td-cls"><span class="label">Type: </span>' + item.type + '</td>\n' +
                '            <td class="td-cls bt-cls">\n' +
                '                <button id="block-' + item.id + '" onclick="blockReport(\'' + item.id + '\')">Block</button>\n' +
                '            </td>\n' +
                '        </tr>\n' +
                '        <tr>\n' +
                '            <td class="td-cls"><span class="label">State: </span>' + item.state + '</td>\n' +
                '            <td class="td-cls"><span class="label">Message: </span>' + item.message + '</td>\n' +
                '            <td class="td-cls bt-cls">\n' +
                '                <button id="resolve-' + item.id + '" onclick="resolveReport(\'' + item.id + '\')">Resolve</button>\n' +
                '            </td>\n' +
                '        </tr>\n' +
                '        <tr>\n' +
                '            <td class="td-cls td-border"><a href="javascript:void(0)">Details</a></td>\n' +
                '            <td class="td-cls td-border"></td>\n' +
                '            <td class="td-cls bt-cls td-border"></td>\n' +
                '        </tr>\n' +
                '    </table>';
        })
        $("#items").html(str);

    })
});

function blockReport(reportId) {
    $.post('http://localhost:3000/reports/' + reportId, {
        "ticketState": "BLOCKED"
    }, function (data) {
        $("#table-" + reportId).hide();
    })
}

function resolveReport(reportId) {
    $.ajax({
        url: 'http://localhost:3000/reports/' + reportId,
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify({
            "ticketState": "CLOSED"
        }),
        success: function (data) {
            $("#block-" + reportId).attr('disabled', 'disabled');
            $("#resolve-" + reportId).attr('disabled', 'disabled');
            $("#resolve-" + reportId).css('color', 'white');
            $("#resolve-" + reportId).css('background', 'green');
        }
    });
}
