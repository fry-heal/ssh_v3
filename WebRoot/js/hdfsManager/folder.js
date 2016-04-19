$(function(){
	
	// folder参数
	var folder_=$('#hdfsManager_list_folder').val();
	// 目录查看
	$('#dg_hdfsManager_list').datagrid({
		border : false,
		fitColumns : false,
		singleSelect : true,
		width : 600,
		height : 250,
		nowrap : false,
		fit : true,
		pagination : true,// 分页控件
		pageSize : 4, // 每页记录数，需要和pageList保持倍数关系
		pageList : [ 4, 8, 12 ],
		rownumbers : true,// 行号
		pagePosition : 'top',
		url : 'hdfs/hdfsManager_listFolder.action',
//		url:'',
		queryParams: {
			folder: folder_
		},
		onLoadError:function(){
			console.info("list load error!");
			 $.messager.alert('信息','加载错误，请联系管理员!','info');
		},
		onBeforeLoad:checkExistAndAuth,
		idField:'id',
		columns :[[
				{
					field : 'name',
					title : '文件名',
					width : '120'
				},{
					field : 'type',
					title : '类型',
					width : '50'
				},{
					field : 'size',
					title : '大小',
					width : '100'
				},{
					field : 'replication',
					title : '副本数',
					width : '50',
				},{
					field : 'blockSize',
					title : '块大小',
					width : '100'
				},{
					field : 'modificationTime',
					title : '修改时间',
					width : '200'
				},{
					field : 'permission',
					title : '权限',
					width : '150'
				},{
					field : 'owner',
					title : '所有者',
					width : '50'
				},{
					field : 'group',
					title : '组名',
					width : '100'
				}
				 ]]
		    }); 
	
	// 目录检索
	$('#dg_hdfsManager_search').datagrid({
		border : false,
		fitColumns : false,
		singleSelect : true,
		width : 600,
		height : 250,
		nowrap : false,
		fit : true,
		pagination : true,// 分页控件
		pageSize : 4, // 每页记录数，需要和pageList保持倍数关系
		pageList : [ 4, 8, 12 ],
		rownumbers : true,// 行号
		pagePosition : 'top',
		url : 'hdfs/hdfsManager_searchFolder.action',
		queryParams: {
			folder: "/",
			name:"",
			nameOp:"no",
			owner:"",
			ownerOp:"no"
		},
		onLoadError:function(){
			console.info("load error!");
			 $.messager.alert('警告','读取错误，请联系管理员!','warning');
		},
		onBeforeLoad:function(param){
			return checkExistAndAuth(param);
		},
		onLoadSuccess:function(data ){
			console.info("success,data:"+data);
		},
		idField:'id',
		columns :[[
				{
					field : 'name',
					title : '文件名',
					width : '120'
				},{
					field : 'type',
					title : '类型',
					width : '50'
				},{
					field : 'size',
					title : '大小',
					width : '100'
				},{
					field : 'replication',
					title : '副本数',
					width : '50',
				},{
					field : 'blockSize',
					title : '块大小',
					width : '100'
				},{
					field : 'modificationTime',
					title : '修改时间',
					width : '200'
				},{
					field : 'permission',
					title : '权限',
					width : '150'
				},{
					field : 'owner',
					title : '所有者',
					width : '50'
				},{
					field : 'group',
					title : '组名',
					width : '100'
				}
				 ]]
		    });
	
});

/**
 * 检查目录是否存在或权限错误
 * @param param
 * @returns {Boolean}
 */
function checkExistAndAuth(param){
	var flag =false;
	$.ajax({
		url : 'hdfs/hdfsManager_checkExistAndAuth.action',
		data: {folder:param.folder},
		async:true,
		dataType:"json",
		async: false,
		context : document.body,
		success : function(data) {
			console.info("data:"+data.flag);
			var retMsg;
			if("noauth" == data.flag){
				flag=false;
				console.info("目录没有权限");
				$.messager.alert('警告','目录没有权限，请重新输入!','warning');
			}else if("nodir" == data.flag){
				flag=false;
				console.info("目录不存在");
				$.messager.alert('警告','目录不存在，请重新输入!','warning');
			}else if("true" == data.flag){
				flag =true;
			}
		}
	});
	console.info("flag:"+flag);
	return flag;
}

/**
 * 重新加载数据
 */
function list_data(){
    $('#dg_hdfsManager_list').datagrid('load',{
        folder: $('#hdfsManager_list_folder').val()
    });
}

/**
 * 过滤加载数据
 */
function search_data(){
    $('#dg_hdfsManager_search').datagrid('load',{
        folder: $('#hdfsManager_search_folder').val(),
        name:$('#hdfsManager_search_folder_name').val(),
        nameOp:$('#hdfsManager_search_folder_name_op').combobox('getValue'),
        owner:$('#hdfsManager_search_owner').val(),
        ownerOp:$('#hdfsManager_search_owner_op').combobox('getValue')
    });
}
