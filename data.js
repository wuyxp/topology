/**
 * Created by wuyang on 16/5/26.
 */


//主机接口设计

var nets = {
    'base' : {
        'name'  :   'www',
        'ip'    :   '192.168.1.1',
        'DHCP'  :   '启用',
        'hostN' :   6
    },
    'router' : [
        {
            'rtr_id'    :   'rtr-001',
            'rtr_name'  :   'rtr-name11',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   2,
        },{
            'rtr_id'    :   'rtr-002',
            'rtr_name'  :   'rtr-name22',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   1,
        },{
            'rtr_id'    :   'rtr-003',
            'rtr_name'  :   'rtr-name33',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   1,
        },{
            'rtr_id'    :   'rtr-004',
            'rtr_name'  :   'rtr-name44',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   1,
        }
    ],
    'subnet' : [
        {
            'net_id'    :   'net-001',
            'net_name'  :   'net-name001',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   32,
            'type'      :   'public',
            'router_id' :   'rtr-001'
        },{
            'net_id'    :   'net-002',
            'net_name'  :   'net-name002',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   10,
            'type'      :   'public',
            'router_id' :   'rtr-001'
        },{
            'net_id'    :   'net-003',
            'net_name'  :   'net-name003',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   22,
            'type'      :   'public',
            'router_id' :   'rtr-002'
        },{
            'net_id'    :   'net-004',
            'net_name'  :   'net-name004',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   6,
            'type'      :   'public',
            'router_id' :   'rtr-003'
        }
    ]
};

var hosts = [
    {
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-001'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-001'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-002'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-002'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-002'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-003'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-003'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-003'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-004'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-004'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-004'
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   'net-004'
    }
]




















































