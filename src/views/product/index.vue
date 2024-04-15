<template>
  <!-- app-container的类样式定义在index.css中 -->
  <div class="app-container">
    <div class="switch">
      <a class="all" @click="handleSwitchAllClick">All</a>
      /
      <a class="mine" @click="handleSwitchMineClick">Mine</a>
    </div>
    <el-table
      :data="curShowProducts"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column label="#" width="50px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="CUSIP" align="center">
        <template slot-scope="scope"
          ><a @click.prevent="handleCusipClick(scope.row)">{{
            scope.row.cusip
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Product Name" align="center"
        ><template slot-scope="scope">
          <p>{{ scope.row.productName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="Product Description" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.productDescription }}</p>
        </template>
      </el-table-column>
      <el-table-column label="Position" align="center">
        <template slot-scope="scope"
          ><p>{{ scope.row.position }}</p></template
        >
      </el-table-column>
      <el-table-column label="Start Value" align="center">
        <template slot-scope="scope"
          ><p>{{ scope.row.startingValue }}</p></template
        >
      </el-table-column>
      <el-table-column label="Current Highest Bid Value" align="center" show-overflow-tooltip>
        <template slot-scope="scope"
          ><p>{{ scope.row.bidValue }}</p></template
        >
      </el-table-column>
      <el-table-column label="Bonds Minimum Bid Increment" align="center" show-overflow-tooltip>
        <template slot-scope="scope"
          ><p>{{ scope.row.minimumBidIncrement }}</p></template
        >
      </el-table-column>
      <el-table-column label="Deadline" align="center">
        <template slot-scope="scope"
          ><p>{{ scope.row.auctionDeadline }}</p></template
        >
      </el-table-column>
      <el-table-column label="Your Ranking" align="center">
        <template slot-scope="scope"
          ><p>{{ scope.row.ranking }}</p></template
        >
      </el-table-column>
      <el-table-column label="Action" width="180px" align="center">
        <template slot-scope="scope">
          <template v-if="!scope.row.isInHistory">
              <el-button :class="'button1'"plain @click="handleBid(scope.row)">Bid</el-button>
        </template>
        <template v-else-if="scope.row.isInHistory">
          <el-button :class="'button2'" plain @click="handleEdit(scope.row)">Edit</el-button>
          <delete-btn @deleteBtnClick="handleDelete(scope.row)" />
        </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加 -->
    <div class="add">
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="addProduct"
      ></el-button>
    </div>

    <!-- 表单对话框-->
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogFormVisible"
      width="600px"
      top="5vh"
    >
      <el-form :model="form" label-position="left">
        <el-form-item label="CUSIP" :label-width="formLabelWidth">
          <el-input
            v-model="form.cusip"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Product Name" :label-width="formLabelWidth">
          <el-input
            v-model="form.productName"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Product Description" :label-width="formLabelWidth">
          <el-input
            v-model="form.productDescription"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Start Value" :label-width="formLabelWidth">
          <el-input
            v-model="form.startingValue"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Minimum Bid Increment"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.minimumBidIncrement"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Deadline" :label-width="formLabelWidth">
          <el-input
            v-model="form.auctionDeadline"
            autocomplete="off"
            :disabled="true"
          ></el-input
        ></el-form-item>
        <el-form-item label="Bid Amount" :label-width="formLabelWidth">
          <el-input v-model="form.bidAmount" autocomplete="off"></el-input
        ></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
              handleEditCancle();
              dialogFormVisible = false;
            }
          "
          >Cancle</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              handleEditConfirm();
              dialogFormVisible = false;
            }
          "
          >Confirm</el-button
        >
      </div>
    </el-dialog>

    <!--表格对话框  -->
    <el-dialog
      :title="tableTitle"
      :visible.sync="dialogTableVisible"
      v-loading="loading"
    >
      <el-table :data="gridData">
        <el-table-column property="username" label="username"></el-table-column>
        <el-table-column
          property="bidvalue"
          label="bid amount"
        ></el-table-column>
        <el-table-column property="ranking" label="ranking"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import DeleteBtn from "@/components/deleteBtn.vue";
import {
  getProducts,
  addBid,
  getBidDetails,
  getUserHistory,
  updateBid,
  cancleBid,
} from "@/api/product";
import { getUsername } from "@/utils/auth";
export default {
  components: { DeleteBtn },
  data() {
    return {
      products: [], // projects中的description为数组
      history: [], // 当前用户bid过的
      historyProducts: [], // 在products基础上添加了是否被当前用户bid过

      // 表单相关
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {}, // form中的description为字符串
      formTitle: "BID",
      tableTitle: "",
      formLabelWidth: "180px",

      isBiding: false,
      isEditing: false,

      isShowAll: true,
      isShowMine: false,

      loading: false,

      gridData: [], // 表格中数据
    };
  },
  created() {
    this.fetchData();
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     console.log(1, this.products);
  //     console.log(2, this.history);
  //     console.log(3, this.historyProducts);
  //   });
  // },
  computed: {
    curShowProducts() {
      if (this.isShowAll) return this.historyProducts;
      else if (this.isShowMine) {
        return this.historyProducts.filter((item) => {
          if (item.isInHistory) return true;
        });
      }
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      // 获取当前用户的投资记录
      const username = getUsername();
      getUserHistory(username)
        .then((resp) => {
          resp.data.forEach((item) => {
            this.history.push(item.cusip);
          });
          console.log(this.history);
          return Promise.resolve();
        })
        .then(() => {
          getProducts().then((resp) => {
            // 获取列表
            this.products = resp.data;
            console.log(this.products);
            // 给列表添加是否被当前用户选中过
            let hpro = [];
            this.products.forEach((item) => {
              if (this.history.includes(item.cusip))
                hpro.push({ ...item, isInHistory: true });
              else hpro.push({ ...item, isInHistory: false });
            });
            console.log(hpro);
            this.historyProducts = hpro;
            console.log(this.historyProducts);
            this.loading = false;
            return Promise.resolve();
          });
        })
        .catch((err) => {
          // Message.error(err);
          console.log(err);
        });
    },
    handleBid(product) {
      this.formTitle = "BID";
      this.dialogFormVisible = true;
      console.log(product);
      this.form = product;
      this.isBiding = true;
    },
    handleEdit(product) {
      this.formTitle = "EDIT";
      this.dialogFormVisible = true;
      console.log(product);
      this.form = product;
      this.isEditing = true;
    },
    handleEditConfirm() {
      //这里应该写一个向后端访问当前自己的竞价的请求函数
      console.log(this.form);
      const username = getUsername();
      if (this.isBiding) {
        // 提交bid
        const data = {
          cusip: this.form.cusip,
          username,
          bidAmount: +this.form.bidAmount, // 数字
        };
        addBid(data).then((resp) => {
          console.log(resp);
          this.$message.success(`${username} bids successfully`);
          this.fetchData(); // 重新获取数据
        });
      } else if (this.isEditing) {
        // 修改
        const data = {
          cusip: this.form.cusip,
          username,
          bidAmount: +this.form.bidAmount,
        };
        updateBid(data).then((resp) => {
          console.log(resp);
          this.$message.success(`${username} updates successfully`);
          this.fetchData(); // 重新获取数据
        });
      }
    },
    handleEditCancle() {
      this.form = {};
      this.isBiding = false;
      this.isEditing = false;
    },
    handleDelete(product) {
      const username = getUsername();
      const data = {
        cusip: product.cusip,
        username,
      };
      cancleBid(data).then((resp) => {
        console.log(resp);
        this.$message.success(`${username} cancles successfully`);
        this.fetchData(); // 重新获取数据
      });
    },
    handleCusipClick(product) {
      console.log(product);
      this.tableTitle = "View Bids Of " + product.productName;
      this.dialogTableVisible = true;
      this.loading = true;
      getBidDetails(product.cusip).then((resp) => {
        console.log(resp);
        this.gridData = resp.data.userBidsList;
        this.loading = false;
      });
    },
    addProduct() {
      this.$router.push({ name: "Add Product" });
    },
    handleSwitchAllClick() {
      this.isShowAll = true;
      this.isShowMine = false;
    },
    handleSwitchMineClick() {
      this.isShowMine = true;
      this.isShowAll = false;
    },
  },
};
</script>

<style scoped>
.add {
  position: fixed;
  right: 2em;
  bottom: 2em;
  opacity: 0.8;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
}
.iconfont {
  font-size: 3em;
  vertical-align: middle;
}
.el-button + .el-button {
  margin-left: 0;
}

a {
  color: rgb(118, 165, 247);
}

a:hover {
  color: rgb(88, 129, 201);
}

.switch {
  margin-bottom: 1.5em;
}

.button1 {
  background-color: #23c518;
  color: white;
  width: 45%;
}

.button2 {
  background-color: #efdb2f;
  color: white;
  width: 45%;
  margin: 1px;
  padding-right: 8%;
  padding-left: 8%;
}
</style>
