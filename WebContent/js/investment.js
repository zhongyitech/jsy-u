//页面加载完成后添加点击事件
$(document).ready(function () {
    INVESTMENT_ITEM.dateformat = DATEFORMAT;
    INVESTMENT_ITEM.moneyformat = MONEYFORMAT;
    INVESTMENT_ITEM.rateformat = RATEFORMAT;
    INVESTMENT_ITEM.numberformat = NUMBERFORMAT;
    INVESTMENT_ITEM.page = PAGE;
    INVESTMENT_ITEM.file = FILE;
    INVESTMENT_ITEM.user = USER;
    INVESTMENT_ITEM.department = DEPARTMENT;
    INVESTMENT_ITEM.fund = FUND;
    INVESTMENT_ITEM.investment = INVESTMENT;
    INVESTMENT_ITEM.customer = CUSTOMER;
    INVESTMENT_ITEM.tzqx = TZQX_REST;
    INVESTMENT_ITEM.tcfpfw = TCFPFW;
    INVESTMENT_ITEM.nianhua = NIANHUA;
    INVESTMENT_ITEM.yewu = YEWU;
    INVESTMENT_ITEM.guanli = GUANLI;

    GUANLI.user = USER;
    GUANLI.usercommission = USERCOMMISSION;
    GUANLI.stringformat = STRINGFORMAT;
    GUANLI.numberformat = NUMBERFORMAT;
    GUANLI.moneyformat = MONEYFORMAT;
    GUANLI.rateformat = RATEFORMAT;
    GUANLI.dateformat = DATEFORMAT;

    YEWU.user = USER;
    YEWU.usercommission = USERCOMMISSION;
    YEWU.stringformat = STRINGFORMAT;
    YEWU.numberformat = NUMBERFORMAT;
    YEWU.moneyformat = MONEYFORMAT;
    YEWU.rateformat = RATEFORMAT;
    YEWU.dateformat = DATEFORMAT;

    USER.ini(true);
    DEPARTMENT.ini(true);
    FUND.ini(true);
    GUANLI.ini(true);
    YEWU.ini(true);
    INVESTMENT_ITEM.ini(true);
});

//基金年化收益、部门经理管理提成、部门经理管业务提成
var NIANHUA = {
    SHOUYI_KEY: 'rest_yield',
    TICHENG_KEY: 'rest_tc',
    YEWU_KEY: 'businessCommision',
    GUANLI_KEY: 'manageCommision',
    result: {},
    item: {},
    getByFidAndMidAndIid: function (fundid, managerid, investment, vers) {
        var params = JSON.stringify({fundid: fundid, managerid: managerid, investment: investment, vers: vers});
        var data = {url: '/api/investmentArchives/getYield', params: params};
        var me = this;
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                me.result = result;
            },
            error: function (result) {
                me.result = result;
                LOGIN.error(result);
            }
        });

        this.item = me.result[REST.RESULT_KEY];
        return this.item;
    }
};

var INVESTMENT_ITEM = {
    INVEST_CUSTOMER_NAME_ID: '#invest-customer-name',
    INVEST_COUNTRY_ID: '#invest-country',
    INVEST_CARDTYPE_ID: '#invest-cardtype',
    INVEST_CARDNUMBER_ID: '#invest-cardnumber',
    INVEST_SFZDZ_ID: '#invest-sfzdz',
    INVEST_BANKNAME_ID: '#invest-bankname',
    INVEST_BANKNUMBER_ID: '#invest-banknumber',
    INVEST_PHONE_ID: '#invest-phone',
    INVEST_ZIP_ID: '#invest-zip',
    INVEST_EMAIL_ID: '#invest-email',
    INVEST_ADDRESS_ID: '#invest-address',
    INVEST_ATTACHMENT_ID: '#invest-attachment',
    INVEST_ATTACHMENT_IMG_ID: '#invest-attachment-img',
    INVEST_KHBZ_ID: '#invest-yhbz',
    INVEST_NUMBER_ID: '#invest-number',
    INVEST_PACT_ID: '#invest-pact',
    INVEST_FUND_ID: '#invest-fund',
    INVEST_MONEY_ID: '#invest-money',
    INVEST_DUE_ID: '#invest-due',
    INVEST_FROM_ID: '#invest-from',
    INVEST_TO_ID: '#invest-to',
    INVEST_PAYTYPE_ID: '#invest-paytype',
    INVEST_NHSYL_ID: '#invest-nhsyl',
    INVEST_STATUS_ID: '#invest-status',
    INVEST_YEARRATE_ID: '#invest-yearrate',
    INVEST_CUSTOMERNAME_ID: '#invest-customername',
    INVEST_BUSNIESSMANAGER_ID: '#invest-busniessmanager',
    INVEST_DM_ID: '#invest-dm',
    INVEST_DEPARTMENT_ID: '#invest-department',
    INVEST_YEWU_ID: '#invest-yewu',
    INVEST_GUANLI_ID: '#invest-guanli',
    INVEST_TICHENGCOMMENT_ID: '#invest-tichengcomment',
    INVEST_REMARK_ID: '#invest-remark',
    INVEST_PRINT_ID: '#invest-print',
    PRINT_NUMBER_NAME: 'a[name="print-number"]',
    PRINT_CUSTOMER_NAME: 'a[name="print-customer"]',
    PRINT_FUND_NAME: 'a[name="print-fund"]',
    PRINT_MONEY_NAME: 'a[name="print-money"]',
    PRINT_SHOUYI_NAME: 'a[name="print-shouyi"]',
    PRINT_FROM_NAME: 'a[name="print-from"]',
    PRINT_PAYDATE_NAME: 'div[name="print-paydate"]',
    response: {},
    item: {},
    attachments: [],
    users: [],
    fund: {},
    user: {},
    department: {},
    guanli: {},
    yewu: {},
    nianhua: {},
    file: {},
    stringformat: STRINGFORMAT,
    dateformat: {},
    moneyformat: {},
    rateformat: {},
    numberformat: {},
    syl: 0,
    ini: function (async) {
        this.set(async);
    },
    set: function (async) {
        //默认同步加载数据
        if (!async) {
            async = false;
        }

        var id = this.page.getParam(this.investment.ID_KEY);

        if (id) {
            var params = JSON.stringify({id: id});
            var data = {url: '/api/investmentArchives/GetById', params: params};
            var me = this;
            $.ajax({
                type: "post",
                url: "../rest/item/get",
                async: async,
                data: data,
                dataType: "json",
                success: function (response) {
                    me.response = response;
                    if (response && response[REST.RESULT_KEY]) {
                        me.item = response[REST.RESULT_KEY];
                        me.setView(me.item);
                    }
                },
                error: function (response) {
                    me.response = response;
                    LOGIN.error(response);
                }
            });
        } else {
            this.setView(this.item);
        }
    },
    setView: function (item) {
        var me = this;

        var number_input = $(this.INVEST_NUMBER_ID);
        var number = item[this.investment.ARCHIVENUM_KEY];
        if (number) {
            number_input.val(number);
        }

        var pact_input = $(this.INVEST_PACT_ID);
        pact_input.keyup(function () {
            me.setHTBH();
        });
        var contract = item[this.investment.CONTRACT_KEY];
        if (contract) {
            pact_input.val(contract);
            me.setHTBH();
        }

        var tzje_input = $(this.INVEST_MONEY_ID);
        tzje_input.keyup(function () {
            me.setTZJE();
        });
        var tzje = item[this.investment.TZJE_KEY];
        if (tzje) {
            tzje_input.val(this.numberformat.toYuan(tzje));
            me.setTZJE();
        }

        var fund_select = $(this.INVEST_FUND_ID);
        var funds = this.fund.getItems();
        if (funds) {
            var option = $('<option></option>');
            fund_select.append(option);
            for (var i in funds) {
                var fundid = funds[i][this.fund.ID_KEY];
                var fundname = this.fund.getName(fundid);
                var option = $('<option value="' + fundid + '">' + fundname + '</option>');
                fund_select.append(option);
            }
        }
        fund_select.change(function () {
            me.setFund();
        });
        var fund = item[this.investment.FUND_KEY];
        if (fund) {
            fund_select.val(fund[this.fund.ID_KEY]);
            me.setFund();
        }

        var fxfs_select = $(this.INVEST_PAYTYPE_ID);
        var fxfs = item[this.investment.FXFS_KEY];
        if (fxfs) {
            fxfs_select.val(fxfs);
            me.setFXFS();
        }

        var tzqx_select = $(this.INVEST_DUE_ID);
        tzqx_select.change(function () {
            me.setTZQX();
        });
        var tzqx = item[this.investment.TZQX_KEY];
        if (tzqx) {
            tzqx_select.val(tzqx);
            me.setTZQX();
        }

        var rgrq_input = $(this.INVEST_FROM_ID);
        var rgrq = item[this.investment.RGRQ_KEY];
        rgrq_input.change(function () {
            me.setRGRQ();
        });
        rgrq_input.blur(function () {
            me.setRGRQ();
        });
        if (rgrq) {
            rgrq_input.val(this.dateformat.toDate(rgrq));
            me.setRGRQ();
        } else {
            rgrq_input.val(this.dateformat.toDate(new Date()));
            me.setRGRQ();
        }

        var dqrq_input = $(this.INVEST_TO_ID);
        var dqrq = item[this.investment.DQRQ_KEY];
        if (dqrq) {
            dqrq_input.val(this.dateformat.toDate(dqrq));
            me.setDQRQ();
        } else {
            var now = new Date();
            dqrq_input.val(this.dateformat.toDate(now.setMonth(now.getMonth() + 12)));
            me.setDQRQ();
        }

        var nhsyl_input = $(this.INVEST_YEARRATE_ID);
        $(nhsyl_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                $(this).val(me.stringformat.toRate($(this).val()));
            }

            me.setNHSYL();
        });
        var nhsyl = item[this.investment.NHSYL_KEY];
        if (nhsyl) {
            nhsyl_input.val(this.numberformat.toRate(nhsyl));
            me.setNHSYL();
        }

        var customername_input = $(this.INVEST_CUSTOMERNAME_ID);
        customername_input.change(function () {
            me.setKHMC();
        });
        var customername = item[this.investment.USERNAME_KEY];
        if (customername) {
            customername_input.val(customername);
            me.setKHMC();
        }

        var users = this.user.getItems();
        var bm_select = $(this.INVEST_BUSNIESSMANAGER_ID);
        if (bm_select && users) {
            var option = $('<option></option>');
            bm_select.append(option);
            for (var i in users) {
                var userid = users[i][this.user.ID_KEY];
                var username = USER.toView(users[i]);
                var option = $('<option value="' + userid + '">' + username + '</option>');
                bm_select.append(option);
            }
        }
        bm_select.change(function () {
            me.setYWJL();
        });
        var bm = item[this.investment.YWJL_KEY];
        if (bm) {
            bm_select.val(bm[this.user.ID_KEY]);
        }

        var dm_select = $(this.INVEST_DM_ID);
        if (dm_select && users) {
            var option = $('<option></option>');
            dm_select.append(option);
            for (var i in users) {
                var userid = users[i][this.user.ID_KEY];
                var username = this.user.getName(userid);
                var option = $('<option value="' + userid + '">' + username + '</option>');
                dm_select.append(option);
            }
        }
        var dm = item[this.investment.BMJL_KEY];
        if (dm) {
            dm_select.val(dm[this.user.ID_KEY]);
        }
        var departments = this.department.getItems();
        var department_select = $(this.INVEST_DEPARTMENT_ID);
        if (departments) {
            var option = $('<option></option>');
            department_select.append(option);
            for (var i in departments) {
                var departmentid = departments[i][this.department.ID_KEY];
                var departmentname = departments[i][this.department.NAME_KEY];
                var option = $('<option value="' + departmentid + '">' + departmentname + '</option>');
                department_select.append(option);
            }
        }
        var department = item[this.investment.BM_KEY];
        if (department) {
            department_select.val(department);
        }

        var ywtc_input = $(this.INVEST_YEWU_ID);
        var ywtc = item[this.investment.YWTC_KEY];
        if (ywtc) {
            ywtc_input.val(this.numberformat.toRate(ywtc));
        }

        var gltc_input = $(this.INVEST_GUANLI_ID);
        var gltc = item[this.investment.GLTC_KEY];
        if (gltc) {
            gltc_input.val(this.numberformat.toRate(gltc));
        }

        var descrption_input = $(this.INVEST_TICHENGCOMMENT_ID);
        var descrption = item[this.investment.DESCRIPTION_KEY];
        if (descrption) {
            descrption_input.val(descrption);
        }

        var gltcs = item[this.investment.GLTCS_KEY];
        this.guanli.set(gltcs);

        var ywtcs = item[this.investment.YWTCS_KEY];
        this.yewu.set(ywtcs);

        //客户信息
        var customer_name_input = $(this.INVEST_CUSTOMER_NAME_ID);
        var customer = item[this.investment.CUSTOMER_KEY];
        if (customer) {
            customer = this.customer.get(customer[this.customer.ID_KEY]);
            var customer_name = this.customer.getName(customer[this.customer.ID_KEY]);
            customer_name_input.val(customer_name);
        }

        var country_select = $(this.INVEST_COUNTRY_ID);
        if (customer) {
            var country = this.customer.getCountry(customer[this.customer.ID_KEY]);
            country_select.val(country);
        }

        var cardtype_select = $(this.INVEST_CARDTYPE_ID);
        if (customer) {
            var cardtype = this.customer.getCardType(customer[this.customer.ID_KEY]);
            cardtype_select.val(cardtype);
        }

        var cardnumber_select = $(this.INVEST_CARDNUMBER_ID);
        if (customer) {
            var cardnumber = this.customer.getCardNumber(customer[this.customer.ID_KEY]);
            cardnumber_select.val(cardnumber);
        }

        var sfzdz_input = $(this.INVEST_SFZDZ_ID);
        if (customer) {
            var sfzdz = CUSTOMER.toSFZDZ(customer);
            sfzdz_input.val(sfzdz);
        }

        var khh_input = $(this.INVEST_BANKNAME_ID);
        if (customer) {
            var khh = this.customer.getKHH(customer[this.customer.ID_KEY]);
            khh_input.val(khh);
        }

        var yhzh_input = $(this.INVEST_BANKNUMBER_ID);
        if (customer) {
            var yhzh = this.customer.getYHZH(customer[this.customer.ID_KEY]);
            yhzh_input.val(yhzh);
        }

        var phone_input = $(this.INVEST_PHONE_ID);
        if (customer) {
            var phone = this.customer.toPhone(customer);
            phone_input.val(phone);
        }

        var postalcode_input = $(this.INVEST_ZIP_ID);
        if (customer) {
            var postalcode = this.customer.toPostalCode(customer);
            postalcode_input.val(postalcode);
        }

        var email_input = $(this.INVEST_EMAIL_ID);
        if (customer) {
            var email = this.customer.toEmail(customer);
            email_input.val(email);
        }

        var calladdress_input = $(this.INVEST_ADDRESS_ID);
        if (customer) {
            var calladdress = this.customer.toCallAddress(customer);
            calladdress_input.val(calladdress);
        }
        if (customer) {
            var calladdress = this.customer.toCallAddress(customer);
            calladdress_input.val(calladdress);
        }

        var attachment = $(this.INVEST_ATTACHMENT_ID);
        attachment.change(function () {
            me.attachments = me.file.upload($(this)[0].files);
            var attachments = me.attachments;
            if (attachments) {
                var attachment_div = $(me.INVEST_ATTACHMENT_IMG_ID);
                var attachment_imgs = attachment_div.find('div[class=attachment-div]');
                for (var i = 0; i < attachment_imgs.length; i++) {
                    $(attachment_imgs[i]).remove()
                }

                for (var i = 0; i < attachments.length; i++) {
                    var attachment_name = me.attachments[i][me.file.NAME_KEY];
                    var attachment_src = '../rest/file/download?path=' + me.attachments[i][me.file.PATH_KEY];
                    var attachment_item = $('<div class="attachment-div"></div>');
                    attachment_div.append(attachment_item);
                    var attachment_i = $('<i class="attachment-i"></i>');
                    attachment_item.append(attachment_i);
                    var attachment = $('<img class="attachment-img" title="' + attachment_name + '" src="' + attachment_src + '">');
                    attachment_i.append(attachment);
                }
            }
        });
        if (customer) {
            me.attachments = this.customer.toUploadFiles(customer);
            var attachments = me.attachments;
            if (attachments) {
                var attachment_div = $(me.INVEST_ATTACHMENT_IMG_ID);
                var attachment_imgs = attachment_div.find('div[class=attachment-div]');
                for (var i = 0; i < attachment_imgs.length; i++) {
                    $(attachment_imgs[i]).remove()
                }

                for (var i = 0; i < attachments.length; i++) {
                    var attachment = me.file.get(me.attachments[i][me.file.ID_KEY]);
                    var attachment_name = attachment[me.file.NAME_KEY];
                    var attachment_src = '../rest/file/download?path=' + attachment[me.file.PATH_KEY];
                    var attachment_item = $('<div class="attachment-div"></div>');
                    attachment_div.append(attachment_item);
                    var attachment_i = $('<i class="attachment-i"></i>');
                    attachment_item.append(attachment_i);
                    var attachment = $('<img class="attachment-img" title="' + attachment_name + '" src="' + attachment_src + '">');
                    attachment_i.append(attachment);
                }
            }
        }

        var khbz_input = $(this.INVEST_KHBZ_ID);
        if (customer) {
            var khbz = this.customer.toRemark(customer);
            khbz_input.val(khbz);
        }

        //通过定时任务为动态生成的控件绑定事件
        this.task(450);
    },
    task: function (time) {
        var finish = $('.buttonFinish');
        if (finish) {
            finish.attr('onclick', 'INVESTMENT_ITEM.save()');
            if (finish.attr('onclick')) {
                //IE8需要重新渲染
//					$('.toggle-button').click();
//					$('.toggle-button').click();
                return;
            }
        }

        setTimeout("INVESTMENT_ITEM.task()", time);
    },
    setHTBH: function () {
        var me = this;
        me.setVers();
        me.setFXFS();

        var htbh = $(this.INVEST_PACT_ID).val();
        var print = $(this.INVEST_PRINT_ID);
        var numbers = print.find(this.PRINT_NUMBER_NAME);
        for (var i = 0; i < numbers.length; i++) {
            var number_a = $(numbers.get(i));
            if (htbh) {
                number_a.text(htbh + '01');
            } else {
                number_a.text("________");
            }
        }
    },
    setVers: function () {//设置合同版本
        var me = this;
        var htbh = $(this.INVEST_PACT_ID).val();
        var vers = this.stringformat.toVers(htbh);

        if (vers != me.vers) {//版本变更后更新年化收益率
            me.vers = vers;

            me.setTCBL();
        }
    },
    setFund: function () {
        var me = this;
        me.iniTZQX();
        me.setTCBL();

        var fund_select = $(this.INVEST_FUND_ID);
        var fund = fund_select.find('option[value=' + fund_select.val() + ']').text();
        var print = $(this.INVEST_PRINT_ID);
        var funds = print.find(this.PRINT_FUND_NAME);
        for (var i = 0; i < funds.length; i++) {
            var fund_a = $(funds.get(i));
            if (fund) {
                fund_a.text(fund);
            } else {
                fund_a.text('________');
            }
        }
    },
    setTZJE: function () {
        var me = this;

        var tzje_input = $(this.INVEST_MONEY_ID);
        var tzje = me.stringformat.toYuan(tzje_input.val());
        $(tzje_input).val(tzje);

        var money_number = me.stringformat.toNumber(tzje_input.val());
        var money_wan = money_number / 10000;
        var print = $(this.INVEST_PRINT_ID);
        var moneys = print.find(this.PRINT_MONEY_NAME);
        for (var i = 0; i < moneys.length; i++) {
            var money_a = $(moneys.get(i));
            if (money_wan) {
                money_a.text(money_wan);
            } else {
                money_a.text(money_wan);
            }
        }

        me.setTCBL();
    },
    setFXFS: function () {//设置付息方式
        var me = this;
        var htbh = $(this.INVEST_PACT_ID).val();
        var fxfs = htbh[4];
        if (fxfs != me.fxfs) {//付息方式变更后更新投资期限
            me.fxfs = fxfs;
            var fxfs_select = $(this.INVEST_PAYTYPE_ID);
            fxfs_select.val(fxfs);

            me.iniTZQX();
            me.setFXRQ();
        }
    },
    iniTZQX: function () {//设置投资期限
        var me = this;
        var fxfs_select = $(this.INVEST_PAYTYPE_ID);
        var fxfs = fxfs_select.val();
        var tzqx_select = $(this.INVEST_DUE_ID);
        if (fxfs == 'N') {
            tzqx_select.attr('disabled', false);
        } else {
            tzqx_select.attr('disabled', true);
        }

        var fid = $(this.INVEST_FUND_ID).val();
        if (fxfs == 'N' && fid) {
            var options = tzqx_select.find('option');
            if (options && options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    $(options[i]).remove();
                }
            }

            var tzqx_list = this.tzqx.getByFund(fid);
            if (tzqx_list && tzqx_list.length > 0) {
                for (var i in tzqx_list) {
                    var jsz = this.tzqx.toJSZ(tzqx_list[i]);
                    var dw = this.tzqx.toDW(tzqx_list[i]);
                    var qx = jsz + dw;
                    tzqx_select.append('<option value="' + qx + '">' + qx + '</option>');
                }
            } else {
                tzqx_select.append('<option value="1年">1年</option>');
            }

        } else {
            var options = tzqx_select.find('option');
            if (options && options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    $(options[i]).remove();
                }
            }

            tzqx_select.append('<option value="1年">1年</option>');
        }

        me.setTZQX();
    },
    setTZQX: function () {

    },
    setKHMC: function () {//设置客户名称
        var print = $(this.INVEST_PRINT_ID);
        var khmc = $(this.INVEST_CUSTOMERNAME_ID).val().trim();
        var customers = print.find(this.PRINT_CUSTOMER_NAME);
        for (var i = 0; i < customers.length; i++) {
            var customer_a = $(customers.get(i));
            if (khmc) {
                customer_a.text(khmc);
            } else {
                customer_a.text('______');
            }
        }
    },
    setYWJL: function () {
        var me = this;

        me.setBMJL();
        me.setBM();

        me.setTCBL();

        me.setGLTC();
        me.setYWTC();
    },
    setGLTC: function () {
        var ywjl_select = $(this.INVEST_BUSNIESSMANAGER_ID);
        var tzje_input = $(this.INVEST_MONEY_ID);
        var gltcbl_input = $(this.INVEST_GUANLI_ID);

        var gltcs = [];
        if (ywjl_select && tzje_input && gltcbl_input) {
            var ywjl = ywjl_select.val();
            var tzje = MONEYFORMAT.toNumber(tzje_input.val());
            var gltcbl = RATEFORMAT.toNumber(gltcbl_input.val());

            if (ywjl && tzje && gltcbl) {
                var gltc = {};
                var tcr = {};
                tcr[USER.ID_KEY] = ywjl;
                gltc[USERCOMMISSION.USER_KEY] = tcr;

                var date70 = new Date();
                date70.setMonth(date70.getMonth() + 1);
                date70.setDate(0);

                var date20 = new Date();
                date20.setYear(date20.getFullYear() + 1);
                date20.setMonth(0);
                date20.setDate(0);

                var date10 = new Date();
                date10.setYear(date10.getFullYear() + 2);
                date10.setMonth(0);
                date10.setDate(0);

                gltc[USERCOMMISSION.TCBL_KEY] = 1;

                gltc[USERCOMMISSION.TCFFSJ_KEY] = date70;
                gltc[USERCOMMISSION.GLFFSJ2_KEY] = date20;
                gltc[USERCOMMISSION.GLFFSJ3_KEY] = date10;

                gltc[USERCOMMISSION.SJFFSJ_KEY] = '';

                var gltcje = tzje * gltcbl;
                gltc[USERCOMMISSION.TCJE_KEY] = STRINGFORMAT.toYuan(gltcje);

                gltcs[0] = gltc;
            }
        }
        GUANLI.set(gltcs);
    },
    setYWTC: function () {
        var ywjl_select = $(this.INVEST_BUSNIESSMANAGER_ID);
        var tzje_input = $(this.INVEST_MONEY_ID);
        var ywtcbl_input = $(this.INVEST_YEWU_ID);

        var items = [];
        if (ywjl_select && tzje_input && ywtcbl_input) {
            var ywjl = ywjl_select.val();
            var tzje = MONEYFORMAT.toNumber(tzje_input.val());
            var ywtcbl = RATEFORMAT.toNumber(ywtcbl_input.val());

            if (ywjl && tzje && ywtcbl) {
                var item = {};
                var tcr = {};
                tcr[USER.ID_KEY] = ywjl;
                item[USERCOMMISSION.USER_KEY] = tcr;

                var tcyffsj = new Date();
                tcyffsj.setMonth(tcyffsj.getMonth() + 1);
                tcyffsj.setDate(0);

                item[USERCOMMISSION.TCBL_KEY] = 1;

                item[USERCOMMISSION.TCFFSJ_KEY] = tcyffsj;

                item[USERCOMMISSION.SJFFSJ_KEY] = '';

                var ywtcje = tzje * ywtcbl;
                item[USERCOMMISSION.TCJE_KEY] = STRINGFORMAT.toYuan(ywtcje);

                items[0] = item;
            }
        }
        YEWU.set(items);
    },
    setBMJL: function () {//设置部门经理
        var me = this;
        var ywjl = $(this.INVEST_BUSNIESSMANAGER_ID).val();
        if (ywjl) {
            var bmjl = me.user.getDM(ywjl);
            if (bmjl) {
                $(me.INVEST_DM_ID).val(bmjl[me.user.ID_KEY]);
            } else {
                $(me.INVEST_DM_ID).val('');
            }
        } else {
            $(me.INVEST_DM_ID).val('');
        }
    },
    setBM: function () {
        var me = this;
        var ywjl = $(this.INVEST_BUSNIESSMANAGER_ID).val();
        if (ywjl) {
            ywjl = me.user.get(ywjl);
            if (ywjl) {
                $(me.INVEST_DEPARTMENT_ID).val(ywjl[me.user.DEPARTMENT_KEY][me.department.ID_KEY]);
            } else {
                $(me.INVEST_DEPARTMENT_ID).val('');
            }
        } else {
            $(me.INVEST_DEPARTMENT_ID).val('');
        }
    },
    setNHSYL: function () {//设置年化收益率
        var me = this;

        var nhsyl = $(me.INVEST_YEARRATE_ID).val();
        var print = $(this.INVEST_PRINT_ID);
        var nhsy_print = print.find(this.PRINT_SHOUYI_NAME);
        for (var i = 0; i < nhsy_print.length; i++) {
            var shouyi_a = $(nhsy_print.get(i));
            if (nhsyl) {
                shouyi_a.text(nhsyl);
            } else {
                shouyi_a.text('________');
            }
        }

        me.setYWTCBL();
        me.setGLTCBL();
    },
    setTCBL: function () {
        var me = this;
        var dmid = $(me.INVEST_DM_ID).val();
        var fid = $(this.INVEST_FUND_ID).val();
        var tzje = $(this.INVEST_MONEY_ID).val();
        var investment = this.moneyformat.toNumber(tzje);
        var htbh = $(this.INVEST_PACT_ID).val();
        var vers = this.stringformat.toVers(htbh);

        if (dmid && fid && investment && vers) {
            me.tcbl = this.nianhua.getByFidAndMidAndIid(fid, dmid, investment, vers);
            var tcbl = me.tcbl;

            if (tcbl) {
                var shouyi = tcbl[this.nianhua.SHOUYI_KEY];
                var ticheng = JSON.parse(tcbl[this.nianhua.TICHENG_KEY]);
                var sfbx = ticheng[this.tcfpfw.SFBX_KEY];
                var bxsyl = ticheng[this.tcfpfw.BXSYL_KEY];

                if (sfbx) {
                    $(me.INVEST_YEARRATE_ID).attr('readonly', false);
                    $(me.INVEST_YEARRATE_ID).val(this.numberformat.toRate(bxsyl));
                } else {
                    $(me.INVEST_YEARRATE_ID).attr('readonly', true);
                    $(me.INVEST_YEARRATE_ID).val(this.numberformat.toRate(shouyi));
                }
            } else {
                $(me.INVEST_YEARRATE_ID).attr('readonly', true);
                $(me.INVEST_YEARRATE_ID).val('');
            }
        } else {
            me.tcbl = null;
            $(me.INVEST_YEARRATE_ID).attr('readonly', true);
            $(me.INVEST_YEARRATE_ID).val('');
        }

        me.setNHSYL();
    },
    setYWTCBL: function () {
        var me = this;
        var tcbl = me.tcbl;
        if (tcbl) {
            var tcfp_string = tcbl[this.nianhua.TICHENG_KEY];
            if (tcfp_string) {
                var tcfp = JSON.parse(tcfp_string);
                var sfbx = tcfp[this.tcfpfw.SFBX_KEY];
                if (sfbx) {
                    var jjsy = tcbl[this.nianhua.SHOUYI_KEY];
                    var nhsyl = this.rateformat.toNumber($(me.INVEST_YEARRATE_ID).val());
                    var ywtcbl = NUMBER.toFixed(jjsy - nhsyl);
                    $(me.INVEST_YEWU_ID).val(this.numberformat.toRate(ywtcbl));
                } else {
                    var ywtcbl = tcfp[this.nianhua.YEWU_KEY];
                    $(me.INVEST_YEWU_ID).val(this.numberformat.toRate(ywtcbl));
                }
            } else {
                $(me.INVEST_YEWU_ID).val('');
            }
        } else {
            $(me.INVEST_YEWU_ID).val('');
        }

    },
    setGLTCBL: function () {
        var me = this;
        var tcbl = me.tcbl;
        if (tcbl) {
            var tcfp_string = tcbl[this.nianhua.TICHENG_KEY];
            if (tcfp_string) {
                var tcfp = JSON.parse(tcfp_string);
                var sfbx = tcfp[this.tcfpfw.SFBX_KEY];
                if (sfbx) {
                    $(me.INVEST_GUANLI_ID).val('');
                } else {
                    var ywtcbl = tcfp[this.nianhua.GUANLI_KEY];
                    $(me.INVEST_GUANLI_ID).val(this.numberformat.toRate(ywtcbl));
                }
            } else {
                $(me.INVEST_GUANLI_ID).val('');
            }
        } else {
            $(me.INVEST_GUANLI_ID).val('');
        }

    },
    setRGRQ: function () {//设置认购日期
        var rgrq = $(this.INVEST_FROM_ID).val();
        var rgrq_ch = this.dateformat.toCH(rgrq);
        var print = $(this.INVEST_PRINT_ID);
        var rgrq_print = print.find(this.PRINT_FROM_NAME);
        for (var i = 0; i < rgrq_print.length; i++) {
            var rgrq_a = $(rgrq_print.get(i));
            if (rgrq_ch) {
                rgrq_a.text(rgrq_ch);
            } else {
                rgrq_a.text('________');
            }
        }
    },
    setDQRQ: function () {
        var me = this;

        var rgrz_input = $(this.INVEST_FROM_ID).val();
        var dqrq_input = $(this.INVEST_TO_ID);
        var tzqx = $(this.INVEST_DUE_ID).val();
        var date = new Date(rgrz_input);
        var jsz = this.stringformat.toNumber(tzqx);
        if (tzqx && tzqx.indexOf('年') > -1) {
            var month = 12 * jsz;
            dqrq_input.val(this.dateformat.toDate(date.setMonth(date.getMonth() + month)));
        } else if (tzqx && tzqx.indexOf('天') > -1) {
            var day = jsz * 1;
            dqrq_input.val(this.dateformat.toDate(date.setDate(date.getDate() + day)));
        }

        me.setFXRQ();
    },
    setFXRQ: function () {//付息日期
        var me = this;
        var rgrq = $(this.INVEST_FROM_ID).val();
        var paytype = $(this.INVEST_PAYTYPE_ID)[0].value;
        var print = $(this.INVEST_PRINT_ID);
        var pays = print.find(this.PRINT_PAYDATE_NAME);
        for (var i = 0; i < pays.length; i++) {
            var pay_div = $(pays.get(i));
            var pay_p = pay_div.find('p');
            for (var j = 0; j < pay_p.length; j++) {
                $(pay_p.get(j)).remove();
            }
            var last = new Date(rgrq);
            var dqrq_input = $(this.INVEST_TO_ID);
            last = DATEFORMAT.toCH(dqrq_input.val());
            if (paytype == 'N') {
                pay_div.append('<p class="print-section">付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            } else if (paytype == 'J') {
                var first = new Date(rgrq);
                first = first.setMonth(first.getMonth() + 3);
                first = DATEFORMAT.toCH(first);
                pay_div.append('<p class="print-section">第一次付息日为<a class="print-underline">' + first + '</a>,</p>');

                var second = new Date(rgrq);
                second = second.setMonth(second.getMonth() + 6);
                second = DATEFORMAT.toCH(second);
                pay_div.append('<p class="print-section">第二次付息日为<a class="print-underline">' + second + '</a>,</p>');

                var third = new Date(rgrq);
                third = third.setMonth(third.getMonth() + 9);
                third = DATEFORMAT.toCH(third);
                pay_div.append('<p class="print-section">第三次付息日为<a class="print-underline">' + third + '</a>,</p>');

                pay_div.append('<p class="print-section">第四次付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            } else if (paytype == 'W') {
                var first = new Date(rgrq);
                first = first.setMonth(first.getMonth() + 6);
                first = DATEFORMAT.toCH(first);
                pay_div.append('<p class="pr-text">第一次付息日为<a class="print-underline">' + first + '</a>,</p>');

                pay_div.append('<p class="pr-text">第二次付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            }
        }
    },
    upadatePrint: function () {
        var print = $(this.INVEST_PRINT_ID);

        var pact_input = $(this.INVEST_PACT_ID);
        var numbers = print.find(this.PRINT_NUMBER_NAME);
        for (var i = 0; i < numbers.length; i++) {
            var number_a = $(numbers.get(i));
            var number = pact_input.val();
            if (number) {
                number_a.text(pact_input.val() + "01");
            }
        }

        var customer_input = $(this.INVEST_CUSTOMERNAME_ID);
        var customers = print.find(this.PRINT_CUSTOMER_NAME);
        for (var i = 0; i < customers.length; i++) {
            var customer_a = $(customers.get(i));
            customer_a.text(customer_input.val().trim());
        }

        var fund_select = $(this.INVEST_FUND_ID);
        var funds = print.find(this.PRINT_FUND_NAME);
        for (var i = 0; i < funds.length; i++) {
            var fund_a = $(funds.get(i));
            fund_a.text(fund_select.text().trim());
        }

        var money_input = $(this.INVEST_MONEY_ID);
        var money_int = MONEYFORMAT.toNumber(money_input.val());
        var money_wan = money_int / 10000;
        money_wan = NUMBERFORMAT.toCount(money_wan);
        var money_number = MONEYFORMAT.toNumber(money_wan);
        var moneys = print.find(this.PRINT_MONEY_NAME);
        for (var i = 0; i < moneys.length; i++) {
            var money_a = $(moneys.get(i));
            money_a.text(money_number);
        }

        var fund_select = $(this.INVEST_FUND_ID);
        var funds = print.find(this.PRINT_FUND_NAME);
        var fundid = fund_select.val();
        var fundname = "";
        if (fundid) {
            fundname = this.fund.getName(fundid);
        }
        for (var i = 0; i < funds.length; i++) {
            var fund_a = $(funds.get(i));
            fund_a.text(fundname);
        }

        var rgrq = $(this.INVEST_FROM_ID).val();
        var from = this.dateformat.toCH(rgrq);
        var froms = print.find(this.PRINT_FROM_NAME);
        for (var i = 0; i < froms.length; i++) {
            var from_a = $(froms.get(i));
            from_a.text(from);
        }

        var paytype = $(this.INVEST_PAYTYPE_ID)[0].value;
        var pays = print.find(this.PRINT_PAYDATE_NAME);
        for (var i = 0; i < pays.length; i++) {
            var pay_div = $(pays.get(i));
            var pay_p = pay_div.find('p');
            for (var j = 0; j < pay_p.length; j++) {
                $(pay_p.get(j)).remove();
            }
            var last = new Date(rgrq);
            var dqrq_input = $(this.INVEST_TO_ID);
            last = DATEFORMAT.toCH(dqrq_input.val());
            if (paytype == 'N') {
                pay_div.append('<p class="print-section">付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            } else if (paytype == 'J') {
                var first = new Date(rgrq);
                first = first.setMonth(first.getMonth() + 3);
                first = DATEFORMAT.toCH(first);
                pay_div.append('<p class="print-section">第一次付息日为<a class="print-underline">' + first + '</a>,</p>');

                var second = new Date(rgrq);
                second = second.setMonth(second.getMonth() + 6);
                second = DATEFORMAT.toCH(second);
                pay_div.append('<p class="print-section">第二次付息日为<a class="print-underline">' + second + '</a>,</p>');

                var third = new Date(rgrq);
                third = third.setMonth(third.getMonth() + 9);
                third = DATEFORMAT.toCH(third);
                pay_div.append('<p class="print-section">第三次付息日为<a class="print-underline">' + third + '</a>,</p>');

                pay_div.append('<p class="print-section">第四次付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            } else if (paytype == 'W') {
                var first = new Date(rgrq);
                first = first.setMonth(first.getMonth() + 6);
                first = DATEFORMAT.toCH(first);
                pay_div.append('<p class="pr-text">第一次付息日为<a class="print-underline">' + first + '</a>,</p>');

                pay_div.append('<p class="pr-text">第二次付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            }
        }
    },
    getItem: function () {
        var me = this;
        var item = this.item;
        var customer = {};

        var customer_name = $(this.INVEST_CUSTOMER_NAME_ID).val();
        if (customer_name) {
            customer['name'] = customer_name.trim();
        }

        var country = $(this.INVEST_COUNTRY_ID).val();
        if (country) {
            customer['country'] = country.trim();
        }

        var cardtype = $(this.INVEST_CARDTYPE_ID).val();
        if (cardtype) {
            customer['credentialsType'] = cardtype.trim();
        }

        var cardnumber = $(this.INVEST_CARDNUMBER_ID).val();
        if (cardnumber) {
            customer['credentialsNumber'] = cardnumber.trim();
        }

        var sfzdz = $(this.INVEST_SFZDZ_ID).val();
        if (sfzdz) {
            customer[CUSTOMER.SFZDZ_KEY] = sfzdz.trim();
        }

        var bankname = $(this.INVEST_BANKNAME_ID).val();
        if (bankname) {
            customer['khh'] = bankname.trim();
        }

        var banknumber = $(this.INVEST_BANKNUMBER_ID).val();
        if (banknumber) {
            customer['yhzh'] = banknumber.trim();
        }

        var phone = $(this.INVEST_PHONE_ID).val();
        if (phone) {
            customer['telephone'] = phone.trim();
            customer['phone'] = phone.trim();
        }

        var zip = $(this.INVEST_ZIP_ID).val();
        if (zip) {
            customer['postalcode'] = zip.trim();
        }

        var email = $(this.INVEST_EMAIL_ID).val();
        if (email) {
            customer['email'] = email.trim();
        }

        var address = $(this.INVEST_ADDRESS_ID).val();
        if (address) {
            customer['callAddress'] = address.trim();
        }

        var remark = $(this.INVEST_KHBZ_ID).val();
        if (remark) {
            customer['remark'] = remark.trim();
        }

        if (JSON.stringify(customer) != '{}') {
            customer[this.customer.UPLOADFILES_KEY] = this.attachments;
        }

        item['customer'] = customer;

        //档案信息
        var invest_pact = $(this.INVEST_PACT_ID).val();
        if (invest_pact) {
            item['contractNum'] = invest_pact.trim();
        }

        var fund = $(this.INVEST_FUND_ID).val();
        if (fund) {
            item['fund'] = {id: fund.trim()};
        }

        var money = $(this.INVEST_MONEY_ID).val();
        if (money) {
            item['tzje'] = this.moneyformat.toNumber(money);
            item['sjtzje'] = this.moneyformat.toNumber(money);
        }

        var deu = $(this.INVEST_DUE_ID);
        if (deu) {
            item['tzqx'] = deu.val().trim();
        }

        var from = $(this.INVEST_FROM_ID).val();
        if (from) {
            item['rgrq'] = this.dateformat.toRest(from.trim());
        }

        var to = $(this.INVEST_TO_ID).val();
        if (to) {
            item['dqrq'] = this.dateformat.toRest(to.trim());
        }

        var paytype = $(this.INVEST_PAYTYPE_ID);
        if (paytype) {
            item['fxfs'] = paytype[0].value.trim();
        }

        var yearrate = $(this.INVEST_YEARRATE_ID).val();
        if (yearrate) {
            item['nhsyl'] = this.rateformat.toNumber(yearrate);
            item['yqsyl'] = this.rateformat.toNumber(yearrate);
        }

        //合同状态
        var status = $(this.INVEST_STATUS_ID).val();
        if (status) {
            item['htzt'] = status.trim();
        }

        var username = $(this.INVEST_CUSTOMERNAME_ID).val();
        if (username) {
            item['username'] = username.trim();
        }

        var businessmanager = $(this.INVEST_BUSNIESSMANAGER_ID).val();
        if (businessmanager) {
            item['ywjl'] = businessmanager.trim();
        }

        //提成信息
        var dm = $(this.INVEST_DM_ID).val();
        if (dm) {
            item['bmjl'] = {id: dm.trim()};
        }

        var department = $(this.INVEST_DEPARTMENT_ID).val();
        if (department) {
            item['bm'] = department.trim();
        }

        var yewu = $(this.INVEST_YEWU_ID).val();
        if (yewu) {
            item['ywtc'] = this.rateformat.toNumber(yewu);
        }

        var guanli = $(this.INVEST_GUANLI_ID).val();
        if (guanli) {
            item['gltc'] = this.rateformat.toNumber(guanli);
        }

        var description = $(this.INVEST_TICHENGCOMMENT_ID).val();
        if (description) {
            item['description'] = description.trim();
        }

        item['gltcs'] = this.guanli.getItems();

        item['ywtcs'] = this.yewu.getItems();

        var last = new Date(from);
        last = last.setMonth(last.getMonth() + 12);
        if (item['fxfs'] == 'N') {
            item['fxsj1'] = this.dateformat.toRest(last);
        } else if (item['fxfs'] == 'J') {
            var first = new Date(from);
            first = first.setMonth(first.getMonth() + 3);
            item['fxsj1'] = this.dateformat.toRest(first);

            var second = new Date(from);
            second = second.setMonth(second.getMonth() + 6);
            item['fxsj2'] = this.dateformat.toRest(second);

            var third = new Date(from);
            third = third.setMonth(third.getMonth() + 9);
            item['fxsj3'] = this.dateformat.toRest(third);

            item['fxsj4'] = this.dateformat.toRest(last);
        } else if (item['fxfs'] == 'W') {
            var first = new Date(from);
            first = first.setMonth(first.getMonth() + 6);
            item['fxsj1'] = this.dateformat.toRest(first);

            item['fxsj2'] = this.dateformat.toRest(last);
        }

        item[this.investment.ID_KEY] = this.item[this.investment.ID_KEY];
        this.item = item;

        delete item[me.investment.ZJDYSJ_KEY];

        return item;
    },
    setVaildInfo:function(data){

    },
    save: function () {
        var finish = $('.buttonFinish');
        if (finish.hasClass('disabled')) {
            return;
        }

        var item = this.getItem();
        var id = this.item[this.investment.ID_KEY];
        if (!id) {
            id = "";
        }

        var customer = item[this.investment.CUSTOMER_KEY];
        if (JSON.stringify(customer) != '{}' && !customer[this.customer.CARDNUMBER_KEY]) {
            alert('请填写客户证件号码.');
            return;
        }

        var me = this;
        var params = JSON.stringify({id: id});
        var entity = JSON.stringify(item);
        var data = {url: '/api/investmentArchives/CreateOrUpdate', params: params, entity: entity};
        DataOperation.put(data,
            function (result) {
                me.itme = result;
                window.location = me.page.INVESMENT_PRINT;
            }, function(msg,result){
                console.log(result);
                me.setVaildInfo(result);
                alert(msg);
            },
            function (response) {
                me.response = response;
            });
//        $.ajax({
//            type: 'post',
//            url: '../rest/item/put',
//            data: data,
//            dataType: 'json',
//            async: false,
//            success: function (response) {
//                me.response = response;
//                if (response && response[REST.RESULT_KEY] && response[REST.REST_STATUS_KEY] == 'suc') {
//                    me.item = response[REST.RESULT_KEY];
//                    window.location = me.page.INVESMENT_PRINT;
//                } else {
//                    if (response[REST.MSG_KEY]) {
//                        alert(response[REST.MSG_KEY]);
//                        console.log(response[REST.RESULT_KEY]);
//                        var msg = '';
//                        var result = response[REST.RESULT_KEY];
//                        for (var key in result) {
//                            console.log(result[key]);
//                        }
//                    } else {
//                        alert('调用服务出错!');
//                    }
//                }
//            },
//            error: function (response) {
//                me.response = response;
//                LOGIN.error(response);
//                //alert('添加投资失败，请补全带*号的必填信息.');
//                alert('rest服务异常，添加投资失败.');
//            }
//        });
    }
};


//管理提成
var GUANLI = {
    TABLE_ID: '#guanli-table',
    id_add: '#guanli-add',
    id_remove: '#guanli-remove',
    item_key_name: 'guanli-key',
    user: {},
    moneyformat: {},
    rateformat: {},
    dateformat: {},
    item_key: 0,
    items: [],
    ini: function () {
        var me = this;

        $(this.id_add).click(function () {
            me.add();
        });

        $(this.id_remove).click(function () {
            me.remove();
        });

    },
    set: function (items) {
        var table = $(this.TABLE_ID);
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            $(trs[i]).remove();
        }

        if (items && items.length) {
            for (var i in items) {
                this.add(items[i]);
            }
        }

        for (var i = 0; i < 3; i++) {
            this.add();
        }
    },
    add: function (item) {//增加一行
        var key = this.item_key++;
        var table = $(this.TABLE_ID);
        var me = this;

        if (item && item[this.usercommission.ID_KEY]) {
            item = this.usercommission.get(item[this.usercommission.ID_KEY]);
        }

        var tr = $('<tr key="' + key + '"></tr>');
        table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var user_td = $('<td></td>');
        tr.append(user_td);
        var user_select = $('<select class="user-name" name="user"></select>');
        user_td.append(user_select);
        var users = this.user.getItems();
        if (users) {
            var option = $('<option></option>');
            user_select.append(option);
            for (var i in users) {
                var userid = users[i][this.user.ID_KEY];
                var username = this.user.getName(userid);
                var option = $('<option value="' + userid + '">' + username + '</option>');
                user_select.append(option);
            }
        }
        if (item) {
            var user = item[this.usercommission.USER_KEY];
            user_select.val(user[this.user.ID_KEY]);
        }

        var tcbl_td = $('<td></td>');
        tr.append(tcbl_td);
        var tcbl_div = $('<div class="form-input col-md-12"></div>');
        tcbl_td.append(tcbl_div);
        var tcbl_input = $('<input class="" name="rate"/>');
        tcbl_div.append(tcbl_input);
        $(tcbl_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                $(this).val(me.stringformat.toRate($(this).val()));
            }
        });
        if (item) {
            var tcbl = item[this.usercommission.TCBL_KEY];
            tcbl_input.val(me.numberformat.toRate(tcbl));
        }

        var money_td = $('<td></td>');
        tr.append(money_td);
        var money_div = $('<div class="form-input col-md-12"></div>');
        money_td.append(money_div);
        var tcje_input = $('<input name="money"/>');
        money_div.append(tcje_input);
        $(tcje_input).keyup(function () {
            $(this).val(me.stringformat.toYuan($(this).val()));
        });
        if (item) {
            var tcje = item[this.usercommission.TCJE_KEY];
            tcje_input.val(me.stringformat.toYuan(tcje));
        }

        var date70_td = $('<td></td>');
        tr.append(date70_td);
        var date70_div = $('<div class="form-input col-md-12"></div>');
        date70_td.append(date70_div);
        var date70_input = $('<input class="item-date tcal" name="date70"/>');
        date70_div.append(date70_input);
        if (item) {
            var tcffsj = item[this.usercommission.TCFFSJ_KEY];
            date70_input.val(me.dateformat.toDate(tcffsj));
        }

        var date20_td = $('<td></td>');
        tr.append(date20_td);
        var date20_div = $('<div class="form-input col-md-12"></div>');
        date20_td.append(date20_div);
        var date20_input = $('<input class="item-date tcal" name="date20"/>');
        date20_div.append(date20_input);
        if (item) {
            var tcffsj = item[this.usercommission.GLFFSJ2_KEY];
            date20_input.val(me.dateformat.toDate(tcffsj));
        }

        var date10_td = $('<td></td>');
        tr.append(date10_td);
        var date10_div = $('<div class="form-input col-md-12"></div>');
        date10_td.append(date10_div);
        var date10_input = $('<input class="item-date tcal" name="date10"/>');
        date10_div.append(date10_input);
        if (item) {
            var tcffsj = item[this.usercommission.GLFFSJ3_KEY];
            date10_input.val(me.dateformat.toDate(tcffsj));
        }

        var skr_td = $('<td></td>');
        tr.append(skr_td);
        var skr_div = $('<div class="form-input col-md-12"></div>');
        skr_td.append(skr_div);
        var skr_input = $('<input class="" name="jingshouren"/>');
        skr_div.append(skr_input);
        if (item) {
            var skr = item[this.usercommission.SKR_KEY];
            skr_input.val(skr);
        }

        var sjffsj_td = $('<td></td>');
        tr.append(sjffsj_td);
        var sjffsj_div = $('<div class="form-input col-md-12"></div>');
        sjffsj_td.append(sjffsj_div);
        var sjffsj_input = $('<input class="item-date tcal" name="shiji" disabled/>');
        sjffsj_div.append(sjffsj_input);
        f_tcalInit();
        if (item) {
            var sjffsj = item[this.usercommission.SJFFSJ_KEY];
            sjffsj_input.val(me.dateformat.toDate(sjffsj));
        }

        var khh_td = $('<td></td>');
        tr.append(khh_td);
        var khh_div = $('<div class="form-input col-md-12"></div>');
        khh_td.append(khh_div);
        var khh_input = $('<input class="bank-name" name="bankname"/>');
        khh_div.append(khh_input);
        if (item) {
            var khh = item[this.usercommission.KHH_KEY];
            khh_input.val(khh);
        }

        var yhzh_td = $('<td></td>');
        tr.append(yhzh_td);
        var yhzh_div = $('<div class="form-input col-md-12"></div>');
        yhzh_td.append(yhzh_div);
        var yhzh_input = $('<input class="bank-number" name="banknumber"/>');
        yhzh_div.append(yhzh_input);
        if (item) {
            var yhzh = item[this.usercommission.YHZH_KEY];
            yhzh_input.val(yhzh);
        }

        this.items.push({});
    },
    getItems: function () {
        var table = $(this.TABLE_ID);
        var trs = table.find('tr');

        var items = [];
        for (var i = 1; i < trs.length; i++) {
            var item = {};
            var tr = $(trs.get(i));
            var user = tr.find('select[name="user"]').val();
            if (user) {
                item['user'] = {id: user};
            }

            var tcje = tr.find('input[name="money"]').val();
            if (tcje) {
                item['tcje'] = this.moneyformat.toNumber(tcje);
            }

            var tcbl = tr.find('input[name="rate"]').val();
            if (tcbl) {
                item['tcbl'] = this.rateformat.toNumber(tcbl);
            }

            var tcffsj = tr.find('input[name="date70"]').val();
            if (tcffsj) {
                item['tcffsj'] = this.dateformat.toRest(tcffsj);
            }

            var glffsj2 = tr.find('input[name="date20"]').val();
            if (glffsj2) {
                item['glffsj2'] = this.dateformat.toRest(glffsj2);
            }

            var glffsj3 = tr.find('input[name="date10"]').val();
            if (glffsj3) {
                item['glffsj3'] = this.dateformat.toRest(glffsj3);
            }

            var skr = tr.find('input[name="jingshouren"]').val();
            if (skr) {
                item['skr'] = skr.trim();
            }

            var sjffsj = tr.find('input[name="shiji"]').val();
            if (sjffsj) {
                item['sjffsj'] = this.dateformat.toRest(sjffsj);
            }

            var khh = tr.find('input[name="bankname"]').val();
            if (khh) {
                item['khh'] = khh.trim();
            }

            var yhzh = tr.find('input[name="banknumber"]').val();
            if (yhzh) {
                item['yhzh'] = yhzh.trim();
            }

            if (JSON.stringify(item) != '{}') {
                items.push(item);
            }
        }

        return items;
    },
    remove: function () {//删除选中行
        var items_table = $(this.TABLE_ID);
        var items = items_table.find('tr');
        for (var i = 0; i < items.length; i++) {
            var item = $(items.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    }
};

//业务提成
var YEWU = {
    TABLE_ID: '#yewu-table',
    id_add: '#yewu-add',
    id_remove: '#yewu-remove',
    item_key_name: 'item-key',
    user: {},
    moneyformat: {},
    rateformat: {},
    dateformat: {},
    item_key: 0,
    items: [],
    ini: function () {
        var me = this;

        $(this.id_add).click(function () {
            me.add();
        });

        $(this.id_remove).click(function () {
            me.remove();
        });
    },
    set: function (items) {
        var table = $(this.TABLE_ID);
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            $(trs[i]).remove();
        }

        if (items && items.length) {
            for (var i in items) {
                this.add(items[i]);
            }
        }

        for (var i = 0; i < 3; i++) {
            this.add();
        }
    },
    add: function (item) {//增加一行
        var key = this.item_key++;
        var items = $(this.TABLE_ID);
        var me = this;

        if (item && item[this.usercommission.ID_KEY]) {
            item = this.usercommission.get(item[this.usercommission.ID_KEY]);
        }

        var tr = $('<tr key="' + key + '"></tr>');
        items.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var user_td = $('<td></td>');
        tr.append(user_td);
        var user_select = $('<select class="user-name" name="user"></select>');
        user_td.append(user_select);
        var users = this.user.getItems();
        if (users) {
            var option = $('<option></option>');
            user_select.append(option);
            for (var i in users) {
                var userid = users[i][this.user.ID_KEY];
                var username = this.user.getName(userid);
                var option = $('<option value="' + userid + '">' + username + '</option>');
                user_select.append(option);
            }
        }
        if (item) {
            var user = item[this.usercommission.USER_KEY];
            user_select.val(user[this.user.ID_KEY]);
        }

        var tcbl_td = $('<td></td>');
        tr.append(tcbl_td);
        var tcbl_div = $('<div class="form-input col-md-12"></div>');
        tcbl_td.append(tcbl_div);
        var tcbl_input = $('<input class="" name="rate"/>');
        tcbl_div.append(tcbl_input);
        $(tcbl_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                $(this).val(me.stringformat.toRate($(this).val()));
            }
        });
        if (item) {
            var tcbl = item[this.usercommission.TCBL_KEY];
            tcbl_input.val(me.numberformat.toRate(tcbl));
        }

        var money_td = $('<td></td>');
        tr.append(money_td);
        var money_div = $('<div class="form-input col-md-12"></div>');
        money_td.append(money_div);
        var tcje_input = $('<input name="money"/>');
        money_div.append(tcje_input);
        $(tcje_input).keyup(function () {
            $(this).val(me.stringformat.toYuan($(this).val()));
        });
        if (item) {
            var tcje = item[this.usercommission.TCJE_KEY];
            tcje_input.val(me.stringformat.toYuan(tcje));
        }

        var tcffsj_td = $('<td></td>');
        tr.append(tcffsj_td);
        var tcffsj_div = $('<div class="form-input col-md-12"></div>');
        tcffsj_td.append(tcffsj_div);
        var tcffsj_input = $('<input class="tcal" name="plantime"/>');
        tcffsj_div.append(tcffsj_input);
        if (item) {
            var tcffsj = item[this.usercommission.TCFFSJ_KEY];
            tcffsj_input.val(me.dateformat.toDate(tcffsj));
        }

        var skr_td = $('<td></td>');
        tr.append(skr_td);
        var skr_div = $('<div class="form-input col-md-12"></div>');
        skr_td.append(skr_div);
        var skr_input = $('<input class="" name="jingshouren"/>');
        skr_div.append(skr_input);
        if (item) {
            var skr = item[this.usercommission.SKR_KEY];
            skr_input.val(skr);
        }

        var sjffsj_td = $('<td></td>');
        tr.append(sjffsj_td);
        var sjffsj_div = $('<div class="form-input col-md-12"></div>');
        sjffsj_td.append(sjffsj_div);
        var sjffsj_input = $('<input class="tcal" name="shiji" disabled/>');
        sjffsj_div.append(sjffsj_input);
        f_tcalInit();
        if (item) {
            var sjffsj = item[this.usercommission.SJFFSJ_KEY];
            sjffsj_input.val(me.dateformat.toDate(sjffsj));
        }

        var khh_td = $('<td></td>');
        tr.append(khh_td);
        var khh_div = $('<div class="form-input col-md-12"></div>');
        khh_td.append(khh_div);
        var khh_input = $('<input class="bank-name" name="bankname"/>');
        khh_div.append(khh_input);
        if (item) {
            var khh = item[this.usercommission.KHH_KEY];
            khh_input.val(khh);
        }

        var yhzh_td = $('<td></td>');
        tr.append(yhzh_td);
        var yhzh_div = $('<div class="form-input col-md-12"></div>');
        yhzh_td.append(yhzh_div);
        var yhzh_input = $('<input class="bank-number" name="banknumber"/>');
        yhzh_div.append(yhzh_input);
        if (item) {
            var yhzh = item[this.usercommission.YHZH_KEY];
            yhzh_input.val(yhzh);
        }

        this.items.push({});
    },
    getItems: function () {
        var table = $(this.TABLE_ID);
        var trs = table.find('tr');

        var items = [];
        for (var i = 1; i < trs.length; i++) {
            var item = {};
            var tr = $(trs.get(i));
            var user = tr.find('select[name="user"]').val();
            if (user) {
                item['user'] = {id: user};
            }

            var tcje = tr.find('input[name="money"]').val();
            if (tcje) {
                item['tcje'] = this.moneyformat.toNumber(tcje);
            }

            var tcbl = tr.find('input[name="rate"]').val();
            if (tcbl) {
                item['tcbl'] = this.rateformat.toNumber(tcbl);
            }

            var tcffsj = tr.find('input[name="plantime"]').val();
            if (tcffsj) {
                item['tcffsj'] = this.dateformat.toRest(tcffsj);
            }

            var skr = tr.find('input[name="jingshouren"]').val();
            if (skr) {
                item['skr'] = skr.trim();
            }

            var sjffsj = tr.find('input[name="shiji"]').val();
            if (sjffsj) {
                item['sjffsj'] = this.dateformat.toRest(sjffsj);
            }

            var khh = tr.find('input[name="bankname"]').val();
            if (khh) {
                item['khh'] = khh.trim();
            }

            var yhzh = tr.find('input[name="banknumber"]').val();
            if (yhzh) {
                item['yhzh'] = yhzh.trim();
            }

            if (JSON.stringify(item) != '{}') {
                items.push(item);
            }
        }

        return items;
    },
    remove: function () {//删除选中行
        var items_table = $(this.TABLE_ID);
        var items = items_table.find('tr');
        for (var i = 0; i < items.length; i++) {
            var item = $(items.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    }
};

