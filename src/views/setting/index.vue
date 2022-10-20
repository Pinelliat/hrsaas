<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="角色管理" name="first">
          <el-row style="height:60px" type="flex" align="middle">
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="addRole"
            >新增角色</el-button>
          </el-row>
          <el-table v-loading="loading" border="" :data="list">
            <el-table-column align="center" type="index" label="序号" width="80" />
            <el-table-column align="center" prop="name" label="名称" width="240" />
            <el-table-column align="center" prop="description" label="描述" />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <!-- <el-pagination layout="prev,pager,next" /> -->
            <el-pagination
              v-if="total>0"
              background
              :current-page.sync="page.page"
              :page-sizes="[2, 5, 10, 20]"
              :page-size.sync="page.pagesize"
              layout="total, sizes, prev, pager, next"
              :total="total"
              @size-change="getRoleList"
              @current-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">

          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <roleDialog ref="roleDialog" :dialog-visible.sync="dialogVisible" />
  </div>

</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import roleDialog from './components/roleDialog.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'SettingIndex',
  components: {
    roleDialog
  },
  data() {
    return {
      activeTab: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo()
  },
  methods: {
    addRole() {
      this.dialogVisible = true
    },
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.list = rows
        this.total = total
      } finally {
        console.log('finally')
        this.loading = false
      }
    },
    edit(row) {
      this.$refs.roleDialog.roleForm = { ...row }
      this.dialogVisible = true
    },
    async deleteRole(id) {
      // try {
      //   await this.$confirm('确认删除吗', '提示', {
      //     cancelButtonText: '取消',
      //     confirmButtonText: '确定',
      //     type: 'warning'
      //   })
      // } catch (e) {
      //   console.log(e)
      // }

      try {
        await this.$confirm('确认删除吗', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        // 在这里调用接口
        // 只有点击了确定 才能进入到下方
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (e) {
        console.log(e)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

