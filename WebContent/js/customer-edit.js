//数据加载、按钮点击事件等
$(document).ready(function(){
	CUSTOMER_FORM.ini(true);
});

var CUSTOMER_FORM={//客户信息表单
		VIEW_ID: '#customer-view',
		FORM_ID: '#customer-form',
		SUBMIT_ID: '#submit-button',
		NAME_ID: '#name',
		COUNTRY_ID: '#country',
		ZJLX_ID: '#cardtype',
		ZJHM_ID: '#cardnumber',
		SFZDZ_ID: '#sfzdz',
		KHH_ID: '#bankname',
		YHZH_ID: '#banknumber',
		PHONE_ID: '#phone',//联系电话
		YZBM_ID: '#zip',//邮政编码
		EMAIL_ID: '#email',//邮政编码
		ADDRESS_ID: '#address',//通讯地址
		ATTACHMENT_ID: '#attachment',//附件
		IMAGE_ID: '#attachment-img',//附件预览
		REMARK_ID: '#remark',//附件预览
		item: {},
		getView: function(){
			return $(this.VIEW_ID);
		},
		getForm: function(){
			var view = this.getView();
			if(view){
				return view.find(this.FORM_ID);
			}
		},
		getNameInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.NAME_ID);
			}
		},
		setName: function(item){
			this.getNameInput().val(CUSTOMER.toName(item));
		},
		getCountrySelect: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.COUNTRY_ID);
			}
		},
		setCountry: function(item){
			this.getCountrySelect().val(CUSTOMER.toCountry(item));
		},
		getZJLXSelect: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ZJLX_ID);
			}
		},
		setZJLX: function(item){
			this.getZJLXSelect().val(CUSTOMER.toZJLX(item));
		},
		getZJHMInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ZJHM_ID);
			}
		},
		setZJHM: function(item){
			this.getZJHMInput().val(CUSTOMER.toZJHM(item));
		},
		getSFZDZInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.SFZDZ_ID);
			}
		},
		setSFZDZ: function(item){
			this.getSFZDZInput().val(CUSTOMER.toSFZDZ(item));
		},
		getKHHInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.KHH_ID);
			}
		},
		setKHH: function(item){
			this.getKHHInput().val(CUSTOMER.toKHH(item));
		},
		getYHZHInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.YHZH_ID);
			}
		},
		setYHZH: function(item){
			this.getYHZHInput().val(CUSTOMER.toYHZH(item));
		},
		getPhoneInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PHONE_ID);
			}
		},
		setPhone: function(item){
			this.getPhoneInput().val(CUSTOMER.toPhone(item));
		},
		getYZBMInput: function(){//邮政编码
			var form = this.getForm();
			if(form){
				return form.find(this.YZBM_ID);
			}
		},
		setYZBM: function(item){
			this.getYZBMInput().val(CUSTOMER.toYZBM(item));
		},
		getEmailInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.EMAIL_ID);
			}
		},
		setEmail: function(item){
			this.getEmailInput().val(CUSTOMER.toEmail(item));
		},
		getAddress: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ADDRESS_ID);
			}
		},
		setAddress: function(item){
			this.getAddress().val(CUSTOMER.toAddress(item));
		},
		getAttachment: function(item){
			var form = this.getForm();
			if(form){
				return form.find(this.ATTACHMENT_ID);
			}
		},
		iniAttachment: function(){
			var me = this;
			var attachment = this.getAttachment();
			attachment.change(function(){
				me.item[CUSTOMER.ATTACHMENT_KEY] = FILE.upload($(this)[0].files);
				me.setAttachment(me.item);
			});
		},
		getImage: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.IMAGE_ID);
			}
		},
		setAttachment: function(item){
			var attachments = CUSTOMER.toAttachment(item);
			if(attachments){
				this.item[CUSTOMER.ATTACHMENT_KEY]=attachments;
				var attachment_div = this.getImage();
				var attachment_imgs = attachment_div.find('div[class=attachment-div]');
				for(var i=0; i<attachment_imgs.length; i++){
					$(attachment_imgs[i]).remove()
				}
				
				for(var i=0; i<attachments.length; i++){
					var attachment = attachments[i];
					var id = attachment[FILE.ID_KEY];
					if(id){
						attachment = FILE.get(id);
					}
					
					var attachment_name = attachment[FILE.NAME_KEY];
					var attachment_src = '../rest/file/download?path=' + attachment[FILE.PATH_KEY];
					var attachment_item = $('<div class="attachment-div"></div>');
					attachment_div.append(attachment_item);
					var attachment_i = $('<i class="attachment-i"></i>');
					attachment_item.append(attachment_i);
					var attachment = $('<img class="attachment-img" title="' + attachment_name + '" src="' + attachment_src + '">');
					attachment_i.append(attachment);
				}
			}
		},
		getRemarkInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.REMARK_ID);
			}
		},
		setRemark: function(item){
			this.getRemarkInput().val(CUSTOMER.toRemark(item));
		},
		getSubmitButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.SUBMIT_ID);
			}
		},
		iniSubmitButton: function(){
			var me = this;
			var button = this.getSubmitButton();
			if(button){
				button.click(function(){
					me.submit();
				});
			}
		},
		ini: function(async){
			if(!async){
				async = false;
			}
			
			this.iniSubmitButton();
			this.iniAttachment();
			
			var id = PAGE.getParam(CUSTOMER.ID_KEY);
			if(id){
				var item = CUSTOMER.get(id);
				this.set(item);
			}
		},
		set: function(item){
			this.item = item;
			
			this.setName(item);
			this.setAddress(item);
			this.setAttachment(item);
			this.setCountry(item);
			this.setEmail(item);
			this.setKHH(item);
			this.setPhone(item);
			this.setRemark(item);
			this.setSFZDZ(item);
			this.setYHZH(item);
			this.setYZBM(item);
			this.setZJHM(item);
			this.setZJLX(item);
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			var form = me.getForm();
			var name = this.getNameInput().val();
			if(name){
				item[CUSTOMER.NAME_ID] = name;
			}
			
			var address = this.getAddress().val();
			if(address){
				item[CUSTOMER.ADDRESS_KEY] = address;
			}
			
			var country = this.getCountrySelect().val();
			if(country){
				item[CUSTOMER.COUNTRY_KEY] = country;
			}
			
			var email = this.getEmailInput().val();
			if(email){
				item[CUSTOMER.EMAIL_KEY] = email;
			}
			
			var khh = this.getKHHInput().val();
			if(khh){
				item[CUSTOMER.KHH_KEY] = khh;
			}
			
			var phone = this.getPhoneInput().val();
			if(phone){
				item[CUSTOMER.PHONE_KEY] = phone;
			}
			
			var remark = this.getRemarkInput().val();
			if(remark){
				item[CUSTOMER.REMARK_KEY] = remark;
			}
			
			var sfzdz = this.getSFZDZInput().val();
			if(sfzdz){
				item[CUSTOMER.SFZDZ_KEY] = sfzdz;
			}
			
			var yhzh = this.getYHZHInput().val();
			if(yhzh){
				item[CUSTOMER.YHZH_KEY] = yhzh;
			}
			
			var yzbm = this.getYZBMInput().val();
			if(yzbm){
				item[CUSTOMER.YZBM_KEY] = yzbm;
			}
			
			var zjhm = this.getZJHMInput().val();
			if(zjhm){
				item[CUSTOMER.ZJHM_KEY] = zjhm;
			}
			
			var zjlx = this.getZJLXSelect().val();
			if(zjlx){
				item[CUSTOMER.ZJLX_KEY] = zjlx;
			}
			
			me.item = item;
			return item;
		},
		submit: function(){//提交
			var me = this;
			var item = me.getItem();
			var params = JSON.stringify({id: item[CUSTOMER.ID_KEY]});
			var entity = JSON.stringify(item);
			var data = {url: '/api/customer/update', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: "../rest/item/put", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					window.location = PAGE.CUSTOMER_LIST;
				},
				error: function(response){
					me.response = response;
					if(LOGIN.error(response)){
						alert('提交失败，请补全带*号的必填信息.');
					}
				}
			});
		}
};

