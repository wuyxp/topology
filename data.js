/**
 * Created by wuyang on 16/5/26.
 */


//主机接口设计

var nets = {
    'routers' : [
        {
            'router_id'    :   'rtr-001',
            'router_name'  :   '路由rtr-001',
            'status':   '运行中',
            'external_ips'    :   '202.201.1.1',
            'subnet_count':   2,
        },{
            'router_id'    :   'rtr-002',
            'router_name'  :   '路由rtr-002',
            'status':   '运行中',
            'external_ips'    :   '202.201.1.1',
            'subnet_count':   1,
        },{
            'router_id'    :   'rtr-003',
            'router_name'  :   '路由rtr-003',
            'status':   '运行中',
            'external_ips'    :   '202.201.1.1',
            'subnet_count':   1,
        },{
            'router_id'    :   'rtr-004',
            'router_name'  :   '路由rtr-004',
            'status':   '运行中',
            'external_ips'    :   '202.201.1.1',
            'subnet_count':   1,
        }
    ],
    'nets' : [
        {
            'net_id'    :   'base-net',
            'net_name'  :   '直接连入外网子网01',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   32,
            'type'      :   'public',
            'router_id' :   null,
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },
        {
            'net_id'    :   'net-001',
            'net_name'  :   '连入路由器rtr-001子网01',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   32,
            'type'      :   'public',
            'router_id' :   'rtr-001',
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },{
            'net_id'    :   'net-002',
            'net_name'  :   '连入路由器rtr-001子网02',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   10,
            'type'      :   'public',
            'router_id' :   'rtr-001',
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },{
            'net_id'    :   'net-003',
            'net_name'  :   '直接连入外网子网02',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   10,
            'type'      :   'public',
            'router_id' :   null,
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },{
            'net_id'    :   'net-004',
            'net_name'  :   '连入路由器rtr-002子网01',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   22,
            'type'      :   'public',
            'router_id' :   'rtr-002',
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },{
            'net_id'    :   'net-005',
            'net_name'  :   '直接连入外网子网03',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   10,
            'type'      :   'public',
            'router_id' :   null,
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },{
            'net_id'    :   'net-006',
            'net_name'  :   '连入路由器rtr-002子网02',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   22,
            'type'      :   'public',
            'router_id' :   'rtr-002',
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        },{
            'net_id'    :   'net-007',
            'net_name'  :   '连入路由器rtr-003子网01',
            'cidr'    :   '192.168.2.1',
            'instances_count' :   6,
            'type'      :   'public',
            'router_id' :   'rtr-003',
            'enable_dhcp' : true,
            'gateway_ip' : '10.1.1.1'
        }
    ]
};

var hosts = [
    {
        'instance_id'   :   'host-zasgt25a',
        'instance_name' :   '开发1',
        'instance_state':   '运行中',
        'net'           :   'www',
        'image'         :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'nets'          :   [{
            'id' :'base-net',
            'ip' : '192.168.0.1'
        },{
            'id' : 'net-002',
            'ip' : '192.168.0.2'
        }]
    },{
        'instance_id'   :   'host-zadgs01a',
        'instance_name' :   '开发2',
        'instance_state':   '运行中',
        'net'           :   'www',
        'image'         :   'Windows Server 2008 R',
        'create_date'   :   1464135759,
        'nets'          :   [{
            'id' :'base-net',
            'ip' : '192.168.0.1'
        },{
            'id' : 'net-001',
            'ip' : '192.168.0.2'
        },{
            'id' : 'net-002',
            'ip' : '192.168.0.2'
        }]
    },{
        'instance_id'   :   'host-zadgs01a',
        'instance_name' :   '开发2',
        'instance_state':   '运行中',
        'net'           :   'www',
        'image'         :   'Windows Server 2008 R',
        'create_date'   :   1464135759,
        'nets'          :   [{
            'id' : 'net-003',
            'ip' : '192.168.0.2'
        },{
            'id' : 'net-004',
            'ip' : '192.168.0.2'
        }]
    },{
        'instance_id'   :   'host-zadgs01a',
        'instance_name' :   '开发2',
        'instance_state':   '运行中',
        'net'           :   'www',
        'image'         :   'Windows Server 2008 R',
        'create_date'   :   1464135759,
        'nets'          :   [{
            'id' :'base-net',
            'ip' : '192.168.0.1'
        },{
            'id' : 'net-001',
            'ip' : '192.168.0.2'
        },{
            'id' : 'net-002',
            'ip' : '192.168.0.2'
        }]
    },{
        'instance_id'   :   'host-zadgs01a',
        'instance_name' :   '开发2',
        'instance_state':   '运行中',
        'net'           :   'www',
        'image'         :   'Windows Server 2008 R',
        'create_date'   :   1464135759,
        'nets'          :   [{
            'id' :'base-net',
            'ip' : '192.168.0.1'
        },{
            'id' : 'net-001',
            'ip' : '192.168.0.2'
        },{
            'id' : 'net-002',
            'ip' : '192.168.0.2'
        }]
    },{
        'instance_id'   :   'host-zadgs01a',
        'instance_name' :   '开发2',
        'instance_state':   '运行中',
        'net'           :   'www',
        'image'         :   'Windows Server 2008 R',
        'create_date'   :   1464135759,
        'nets'          :   [{
            'id' :'base-net',
            'ip' : '192.168.0.1'
        },{
            'id' : 'net-001',
            'ip' : '192.168.0.2'
        },{
            'id' : 'net-002',
            'ip' : '192.168.0.2'
        }]
    }
]




















































