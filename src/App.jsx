import React, { useState, useMemo } from "react";
import { supabase } from "./supabaseClient";
import {
  Calculator,
  Users,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Clock,
  Wallet,
  Home,
  Store,
  Bell,
  Check,
  ArrowRight,
  Building2,
  Info,
} from "lucide-react";

// ── 공유 디자인 토큰 ──
// bg: #F3F6FB / surface: #FFFFFF / text: #10182B / sub: #64708A
// accent: #0A6E5D / accent-soft: #E4F3EF / warn: #FF6A45

const TABS = [
  { id: "home", label: "홈", icon: Home },
  { id: "gagye", label: "장부", icon: Calculator },
  { id: "paylog", label: "페이로그", icon: Users },
  { id: "policy", label: "지원사업", icon: Sparkles },
];

/* ───────────────────────── 공통 UI 조각 ───────────────────────── */

function TopBar({ title, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 16px 4px" }}>
      {onBack ? (
        <button
          onClick={onBack}
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: "none",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(16,24,43,0.06)",
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={18} color="#10182B" />
        </button>
      ) : (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "#10182B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Store size={16} color="#fff" />
        </div>
      )}
      <div style={{ fontSize: 17, fontWeight: 800 }}>{title}</div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ flex: 1, background: "#F3F6FB", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 11, color: "#64708A" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, subtitle, children, onOpen }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "#F3F6FB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={17} color="#10182B" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 12, color: "#64708A" }}>{subtitle}</div>
        </div>
      </div>
      {children}
      <button
        onClick={onOpen}
        style={{
          marginTop: 14,
          width: "100%",
          padding: "11px 0",
          borderRadius: 10,
          border: "none",
          background: "#F3F6FB",
          color: "#10182B",
          fontSize: 13.5,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        자세히 보기
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

/* ───────────────────────── 홈 ───────────────────────── */

function HomeScreen({ goTo }) {
  return (
    <>
      <div style={{ padding: "24px 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "#10182B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Store size={16} color="#fff" />
            </div>
            <div style={{ fontSize: 13, color: "#64708A", fontWeight: 600 }}>사장님 홈</div>
          </div>
          <button
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "none",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 2px rgba(16,24,43,0.06)",
            }}
          >
            <Bell size={15} color="#10182B" />
          </button>
        </div>
        <h1 style={{ fontSize: 21, fontWeight: 800, margin: "16px 0 2px" }}>오늘도 수고 많으세요</h1>
        <p style={{ fontSize: 13.5, color: "#64708A", margin: 0 }}>가게 운영에 필요한 걸 한 곳에서 확인</p>
      </div>

      <div style={{ padding: "16px 16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionCard icon={Calculator} title="장부" subtitle="판매가·원가만 넣으면 바로 확인" onOpen={() => goTo("gagye")}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <StatBox label="판매가" value="15,000원" />
            <StatBox label="원가" value="6,200원" />
          </div>
          <div style={{ fontSize: 12, color: "#64708A" }}>쿠팡이츠 선택 시 순이익 6,940원</div>
        </SectionCard>

        <SectionCard icon={Wallet} title="페이로그" subtitle="직원 급여 · 근무 일정" onOpen={() => goTo("paylog")}>
          <div style={{ display: "flex", gap: 8 }}>
            <StatBox label="이번 달 인건비" value="412만원" />
            <StatBox label="근무 인원" value="4명" />
          </div>
        </SectionCard>

        <SectionCard icon={Sparkles} title="지원사업" subtitle="조건에 맞는 정책 · 지원금" onOpen={() => goTo("policy")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>배달료·임대료 고정비 지원</span>
              <span style={{ fontSize: 11.5, color: "#FF6A45", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                <Clock size={11} />D-5
              </span>
            </div>
          </div>
        </SectionCard>

        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#10182B", borderRadius: 14, padding: "14px 16px" }}>
          <TrendingUp size={18} color="#fff" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: 12.5, color: "#DDE3EF", lineHeight: 1.5 }}>
            이번 달 순이익이 지난달보다 늘었어요. 장부에서 상세 내역을 확인해보세요.
          </div>
        </div>
      </div>
    </>
  );
}

/* ───────────────────────── 장부 상세 (Supabase 연동) ───────────────────────── */

const CHANNELS = [
  { id: "coupang", label: "쿠팡이츠", fee: 9.8 },
  { id: "baemin", label: "배달의민족", fee: 6.8 },
  { id: "custom", label: "직접입력", fee: null },
];

const GAGYE_TABS = [
  { id: "ingredients", label: "재료" },
  { id: "menu", label: "메뉴 원가" },
  { id: "profit", label: "손익" },
];

function SegmentedTabs({ tabs, value, onChange }) {
  return (
    <div style={{ display: "flex", background: "#E9EDF5", borderRadius: 11, padding: 3, marginBottom: 18 }}>
      {tabs.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer",
              fontSize: 13.5, fontWeight: 700, background: active ? "#fff" : "transparent",
              color: active ? "#10182B" : "#7B8399", boxShadow: active ? "0 1px 3px rgba(16,24,43,0.1)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// 재료 단가 = (구매가 + 배송비) ÷ 구매수량, sub_unit_qty 있으면 그 단위로 한 번 더 환산
function ingredientUnitCost(ing) {
  if (!ing) return 0;
  let cost = (Number(ing.purchase_price) + Number(ing.shipping_fee || 0)) / Number(ing.purchase_qty || 1);
  if (ing.sub_unit_qty) cost = cost / Number(ing.sub_unit_qty);
  return cost;
}

// 메뉴 원가 = Σ (재료단가 × 사용량 ÷ divide_by)
function computeMenuCost(menuId, menuIngredients, ingredientsById) {
  return menuIngredients
    .filter((mi) => mi.menu_id === menuId)
    .reduce((sum, mi) => {
      const unitCost = ingredientUnitCost(ingredientsById[mi.ingredient_id]);
      const divideBy = Number(mi.divide_by) || 1;
      return sum + unitCost * Number(mi.amount_used) / divideBy;
    }, 0);
}

function useGagyeData() {
  const [ingredients, setIngredients] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuIngredients, setMenuIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    const [ingRes, menuRes, miRes] = await Promise.all([
      supabase.from("gagye_ingredients").select("*").order("sort_order", { ascending: true }),
      supabase.from("gagye_menus").select("*").order("sort_order", { ascending: true }),
      supabase.from("gagye_menu_ingredients").select("*"),
    ]);
    if (ingRes.error || menuRes.error || miRes.error) {
      setError((ingRes.error || menuRes.error || miRes.error).message);
    } else {
      setIngredients(ingRes.data || []);
      setMenus(menuRes.data || []);
      setMenuIngredients(miRes.data || []);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    reload();
  }, []);

  const ingredientsById = useMemo(() => {
    const map = {};
    ingredients.forEach((i) => (map[i.id] = i));
    return map;
  }, [ingredients]);

  return { ingredients, menus, menuIngredients, ingredientsById, loading, error, reload };
}

function EmptyState({ text }) {
  return <div style={{ textAlign: "center", padding: "30px 0", color: "#64708A", fontSize: 13.5 }}>{text}</div>;
}

function IngredientsTab({ data }) {
  const { ingredients, loading, error, reload } = data;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", purchase_price: "", purchase_qty: "", unit: "kg", shipping_fee: "0", sub_unit_name: "", sub_unit_qty: "" });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.name || !form.purchase_price || !form.purchase_qty) return;
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const { error: insertError } = await supabase.from("gagye_ingredients").insert({
      user_id: userData.user.id,
      name: form.name,
      purchase_price: Number(form.purchase_price),
      purchase_qty: Number(form.purchase_qty),
      unit: form.unit,
      shipping_fee: Number(form.shipping_fee) || 0,
      sub_unit_name: form.sub_unit_name || null,
      sub_unit_qty: form.sub_unit_qty ? Number(form.sub_unit_qty) : null,
    });
    setSaving(false);
    if (!insertError) {
      setForm({ name: "", purchase_price: "", purchase_qty: "", unit: "kg", shipping_fee: "0", sub_unit_name: "", sub_unit_qty: "" });
      setShowForm(false);
      reload();
    }
  };

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {ingredients.length === 0 && <EmptyState text="등록된 재료가 없어요" />}
      {ingredients.map((ing) => (
        <div key={ing.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>{ing.name}</div>
            <div style={{ fontSize: 12, color: "#64708A", marginTop: 2 }}>
              {ing.purchase_qty}{ing.unit}당 {Number(ing.purchase_price).toLocaleString()}원
              {ing.shipping_fee > 0 ? ` (배송비 ${Number(ing.shipping_fee).toLocaleString()}원)` : ""}
            </div>
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0A6E5D", textAlign: "right" }}>
            {Math.round(ingredientUnitCost(ing)).toLocaleString()}원
            <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600 }}>{ing.sub_unit_name ? `/${ing.sub_unit_name}` : `/${ing.unit}`}</div>
          </div>
        </div>
      ))}

      {showForm ? (
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", flexDirection: "column", gap: 8 }}>
          <input placeholder="재료명" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="구매가" type="number" value={form.purchase_price} onChange={(e) => setForm({ ...form, purchase_price: e.target.value })} style={inputStyle} />
            <input placeholder="구매수량" type="number" value={form.purchase_qty} onChange={(e) => setForm({ ...form, purchase_qty: e.target.value })} style={inputStyle} />
            <input placeholder="단위(kg,개..)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} style={{ ...inputStyle, maxWidth: 90 }} />
          </div>
          <input placeholder="배송비 (없으면 0)" type="number" value={form.shipping_fee} onChange={(e) => setForm({ ...form, shipping_fee: e.target.value })} style={inputStyle} />
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="조리단위명 (예: g, 선택)" value={form.sub_unit_name} onChange={(e) => setForm({ ...form, sub_unit_name: e.target.value })} style={inputStyle} />
            <input placeholder="환산값 (예: 1000)" type="number" value={form.sub_unit_qty} onChange={(e) => setForm({ ...form, sub_unit_qty: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={() => setShowForm(false)} style={secondaryBtnStyle}>취소</button>
            <button onClick={save} disabled={saving} style={primaryBtnStyle}>{saving ? "저장 중..." : "저장"}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={dashedBtnStyle}>+ 재료 등록</button>
      )}
    </div>
  );
}

function MenuTab({ data }) {
  const { menus, menuIngredients, ingredientsById, loading, error } = data;

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {menus.length === 0 && <EmptyState text="등록된 메뉴가 없어요" />}
      {menus.map((menu) => {
        const items = menuIngredients.filter((mi) => mi.menu_id === menu.id);
        const cost = computeMenuCost(menu.id, menuIngredients, ingredientsById);
        return (
          <div key={menu.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{menu.name}</div>
            <div style={{ fontSize: 12, color: "#64708A", marginBottom: 6 }}>
              {items.map((i) => ingredientsById[i.ingredient_id]?.name).filter(Boolean).join(" · ") || "구성 재료 없음"}
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0A6E5D" }}>원가 {Math.round(cost).toLocaleString()}원</div>
          </div>
        );
      })}
    </div>
  );
}

function ProfitTab({ data }) {
  const { menus, menuIngredients, ingredientsById, loading, error } = data;
  const [menuId, setMenuId] = useState(null);
  const [price, setPrice] = useState(15000);
  const [discount, setDiscount] = useState(0);
  const [channelId, setChannelId] = useState("coupang");
  const [customFee, setCustomFee] = useState(5);

  React.useEffect(() => {
    if (!menuId && menus.length > 0) setMenuId(menus[0].id);
  }, [menus, menuId]);

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;
  if (menus.length === 0) return <EmptyState text="메뉴부터 등록해주세요" />;

  const cost = computeMenuCost(menuId, menuIngredients, ingredientsById);
  const discountedPrice = Math.round(price * (1 - discount / 100));
  const channel = CHANNELS.find((c) => c.id === channelId);
  const fee = channelId === "custom" ? customFee : channel.fee;
  const feeAmount = Math.round((discountedPrice * fee) / 100);
  const net = discountedPrice - Math.round(cost) - feeAmount;
  const marginRate = discountedPrice > 0 ? ((net / discountedPrice) * 100).toFixed(1) : 0;

  return (
    <div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
        <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>메뉴 선택</div>
        <select value={menuId || ""} onChange={(e) => setMenuId(e.target.value)} style={{ ...inputStyle, marginBottom: 14 }}>
          {menus.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>판매가</div>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} style={inputStyle} />
          </label>
          <StatBox label="원가" value={`${Math.round(cost).toLocaleString()}원`} />
        </div>

        <label style={{ display: "block", marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>할인율 (%)</div>
          <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} style={inputStyle} />
        </label>

        <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>판매 채널</div>
        <div style={{ display: "flex", gap: 6 }}>
          {CHANNELS.map((c) => {
            const sel = c.id === channelId;
            return (
              <button key={c.id} onClick={() => setChannelId(c.id)} style={{ flex: 1, fontSize: 12.5, fontWeight: 700, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", background: sel ? "#0A6E5D" : "#F3F6FB", color: sel ? "#fff" : "#64708A" }}>
                {c.label}
              </button>
            );
          })}
        </div>
        {channelId === "custom" && (
          <input type="number" value={customFee} onChange={(e) => setCustomFee(Number(e.target.value) || 0)} style={{ ...inputStyle, marginTop: 10 }} />
        )}
      </div>

      <div style={{ background: "#10182B", borderRadius: 16, padding: 20, marginTop: 12, color: "#fff" }}>
        <div style={{ fontSize: 12.5, color: "#9AA5BD", marginBottom: 4 }}>할인 적용 후 예상 순이익</div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{net.toLocaleString()}원</div>
        <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 12.5, color: "#C7D0E0" }}>
          <span>마진율 {marginRate}%</span>
          <span>할인가 {discountedPrice.toLocaleString()}원</span>
          <span>수수료 {feeAmount.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { flex: 1, boxSizing: "border-box", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #E3E9F3", fontSize: 13.5, fontWeight: 600, width: "100%" };
const primaryBtnStyle = { flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: "#10182B", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer" };
const secondaryBtnStyle = { flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #E3E9F3", background: "#fff", color: "#64708A", fontSize: 13.5, fontWeight: 700, cursor: "pointer" };
const dashedBtnStyle = { padding: "13px 0", borderRadius: 12, border: "1.5px dashed #C7D0E0", background: "transparent", color: "#64708A", fontSize: 13.5, fontWeight: 700, cursor: "pointer" };

function GagyeDetail({ goBack }) {
  const [tab, setTab] = useState("profit");
  const data = useGagyeData();

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <TopBar title="장부" onBack={goBack} />
      <div style={{ padding: "8px 0 0" }}>
        <p style={{ fontSize: 13.5, color: "#64708A", margin: "0 0 16px" }}>재료 등록 → 메뉴 원가 → 손익 확인, 세 단계로 관리해요</p>
        <SegmentedTabs tabs={GAGYE_TABS} value={tab} onChange={setTab} />
        {tab === "ingredients" && <IngredientsTab data={data} />}
        {tab === "menu" && <MenuTab data={data} />}
        {tab === "profit" && <ProfitTab data={data} />}
      </div>
    </div>
  );
}

/* ───────────────────────── 페이로그 상세 ───────────────────────── */

const PAYLOG_TABS = [
  { id: "staff", label: "직원" },
  { id: "schedule", label: "스케줄" },
  { id: "payroll", label: "급여계산" },
];

const STAFF = [
  { id: 1, name: "김OO", type: "4대보험", role: "홀 · 파트타임", wage: "시급 10,500원", schedule: "월·수·금 10:00-16:00" },
  { id: 2, name: "이OO", type: "4대보험", role: "주방 · 정규직", wage: "월 245만원", schedule: "주 5일 09:00-18:00" },
  { id: 3, name: "박OO", type: "3.3%", role: "배달보조", wage: "건당 정산", schedule: "화·목·토 17:00-22:00" },
  { id: 4, name: "최OO", type: "3.3%", role: "주방보조", wage: "시급 11,000원", schedule: "주말 11:00-15:00" },
];

function TypeBadge({ type }) {
  const is433 = type === "3.3%";
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 999,
        background: is433 ? "#FFF3E0" : "#E4F3EF",
        color: is433 ? "#D97706" : "#0A6E5D",
        flexShrink: 0,
      }}
    >
      {type}
    </span>
  );
}

function StaffTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {STAFF.map((s) => (
        <div key={s.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700 }}>{s.name}</span>
                <TypeBadge type={s.type} />
              </div>
              <div style={{ fontSize: 12, color: "#64708A", marginTop: 3 }}>{s.role}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0A6E5D" }}>{s.wage}</div>
          </div>
        </div>
      ))}
      <button
        style={{
          padding: "13px 0", borderRadius: 12, border: "1.5px dashed #C7D0E0", background: "transparent",
          color: "#64708A", fontSize: 13.5, fontWeight: 700, cursor: "pointer",
        }}
      >
        + 직원 추가 (4대보험 / 3.3% 선택)
      </button>
    </div>
  );
}

function ScheduleTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {STAFF.map((s) => (
        <div key={s.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
            <div style={{ fontSize: 12.5, color: "#64708A", marginTop: 3 }}>{s.schedule}</div>
          </div>
          <Clock size={16} color="#A6AEC1" />
        </div>
      ))}
    </div>
  );
}

function PayrollTab() {
  const total = "637만원";
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <StatBox label="이번 달 인건비" value={total} />
        <StatBox label="급여일" value="D-6" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {STAFF.map((s) => (
          <div key={s.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</span>
                <TypeBadge type={s.type} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{s.type === "3.3%" ? "실지급 96.7%" : "4대보험 공제 반영"}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          marginTop: 16, width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
          background: "#10182B", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
        }}
      >
        이번 달 급여명세서 내보내기
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 12, color: "#64708A" }}>
        <Info size={13} />
        4대보험 공제·간이세액·퇴직금은 자동 계산돼요
      </div>
    </div>
  );
}

function PaylogDetail({ goBack }) {
  const [tab, setTab] = useState("payroll");

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <TopBar title="페이로그" onBack={goBack} />
      <div style={{ padding: "8px 0 0" }}>
        <p style={{ fontSize: 13.5, color: "#64708A", margin: "0 0 16px" }}>직원 추가 → 스케줄 입력 → 월말 급여 내보내기</p>
        <SegmentedTabs tabs={PAYLOG_TABS} value={tab} onChange={setTab} />
        {tab === "staff" && <StaffTab />}
        {tab === "schedule" && <ScheduleTab />}
        {tab === "payroll" && <PayrollTab />}
      </div>
    </div>
  );
}

/* ───────────────────────── 지원사업 상세 (단계별 필터) ───────────────────────── */

const AGE_BANDS = [
  { id: "young", label: "만 39세 이하", desc: "청년 대상 사업 다수 해당", min: 0, max: 39 },
  { id: "mid", label: "만 40~64세", desc: "", min: 40, max: 64 },
  { id: "senior", label: "만 65세 이상", desc: "시니어 대상 사업 해당", min: 65, max: 130 },
];
const STAGE_BANDS = [
  { id: "y0", label: "1년 미만", desc: "창업 초기 지원 다수 해당", min: 0, max: 0.99 },
  { id: "y1", label: "1~3년", desc: "", min: 1, max: 2.99 },
  { id: "y3", label: "3~5년", desc: "", min: 3, max: 4.99 },
  { id: "y5", label: "5~7년", desc: "", min: 5, max: 6.99 },
  { id: "y7", label: "7년 이상", desc: "", min: 7, max: 99 },
];
const REVENUE_BANDS = [
  { id: "r0", label: "매출 없음 / 예비창업", min: 0, max: 0 },
  { id: "r1", label: "3천만원 미만", min: 0, max: 30_000_000 },
  { id: "r2", label: "3천만~1억원", min: 30_000_000, max: 100_000_000 },
  { id: "r3", label: "1억~3억원", min: 100_000_000, max: 300_000_000 },
  { id: "r4", label: "3억~10억원", min: 300_000_000, max: 1_000_000_000 },
  { id: "r5", label: "10억원 이상", min: 1_000_000_000, max: Infinity },
];

const POLICY_STEPS = [
  { key: "biz", title: "업종", subtitle: "해당 업종 선택", type: "single", options: [
    { id: "food", label: "외식·배달업", desc: "식당, 카페, 배달전문점" },
    { id: "retail", label: "소매·판매업", desc: "상점, 온라인 판매" },
    { id: "service", label: "서비스업", desc: "미용, 수리, 교육 등" },
    { id: "etc", label: "기타", desc: "제조, 기술, 그 외" },
  ]},
  { key: "form", title: "사업 형태", subtitle: "지원사업 대상 조건 기준", type: "single", options: [
    { id: "solo", label: "개인사업자", desc: "" },
    { id: "corp", label: "법인사업자", desc: "" },
    { id: "prep", label: "예비창업자", desc: "아직 사업자등록 전" },
  ]},
  { key: "age", title: "대표자 연령대", subtitle: "청년 대상 사업 판단 기준", type: "single", options: AGE_BANDS.map(({ id, label, desc }) => ({ id, label, desc })) },
  { key: "stage", title: "사업 운영 기간", subtitle: "업력 조건 확인용", type: "single", options: STAGE_BANDS.map(({ id, label, desc }) => ({ id, label, desc })) },
  { key: "revenue", title: "연매출", subtitle: "대략적인 구간 선택", type: "single", options: REVENUE_BANDS.map(({ id, label }) => ({ id, label, desc: "" })) },
  { key: "region", title: "사업장 지역", subtitle: "지자체별 지원사업 포함", type: "single", options: [
    { id: "seoul", label: "서울", desc: "" },
    { id: "gyeonggi", label: "경기·인천", desc: "" },
    { id: "other", label: "그 외 지역", desc: "" },
  ]},
  { key: "interest", title: "관심 분야", subtitle: "복수 선택 가능", type: "multi", options: [
    { id: "fund", label: "정책자금·대출", desc: "" },
    { id: "cost", label: "임대료·고정비 지원", desc: "" },
    { id: "market", label: "마케팅·판로", desc: "" },
    { id: "digital", label: "디지털·스마트 전환", desc: "" },
    { id: "hire", label: "인건비·고용", desc: "" },
    { id: "restart", label: "폐업·재창업", desc: "" },
  ]},
];

const SAMPLE_PROGRAMS = [
  { id: 1, title: "소상공인 정책자금 융자사업 4차", org: "중소벤처기업부", region: "all", dday: 12, amount: "최대 7천만원", interest: ["fund"], minYears: 1 },
  { id: 2, title: "배달료·임대료 등 5대 고정비 부담완화", org: "소상공인시장진흥공단", region: "all", dday: 5, amount: "월 최대 20만원", interest: ["cost"], bizOnly: ["food"], revenueMax: 300_000_000 },
  { id: 3, title: "온누리상품권 가맹점 마케팅 지원", org: "소진공", region: "all", dday: 21, amount: "홍보물 제작 지원", interest: ["market"], bizOnly: ["food", "retail"] },
  { id: 4, title: "소상공인 스마트상점 기술보급", org: "중기부", region: "all", dday: 30, amount: "최대 500만원", interest: ["digital"], bizOnly: ["food", "retail"] },
  { id: 5, title: "희망리턴패키지 재기지원", org: "소진공", region: "all", dday: 8, amount: "최대 2천만원", interest: ["restart"], minYears: 5 },
  { id: 6, title: "서울 자영업자 경영개선 바우처", org: "서울시", region: "seoul", dday: 3, amount: "최대 100만원", interest: ["cost"], revenueMax: 1_000_000_000 },
  { id: 7, title: "청년 소상공인 인건비 지원", org: "고용노동부", region: "all", dday: 15, amount: "1인당 월 80만원", interest: ["hire"], ageMax: 39, maxYears: 3 },
  { id: 8, title: "경기도 소상공인 디지털 전환 바우처", org: "경기도", region: "gyeonggi", dday: 18, amount: "최대 300만원", interest: ["digital"] },
  { id: 9, title: "폐업 소상공인 채무조정 새출발기금", org: "새출발기금", region: "all", dday: 40, amount: "채무조정 최대 90%", interest: ["restart"], minYears: 3 },
];

function getBand(bands, id) { return bands.find((b) => b.id === id); }

function isEligible(program, answers) {
  if (program.bizOnly && !program.bizOnly.includes(answers.biz)) return false;
  if (program.region && program.region !== "all" && program.region !== answers.region) return false;
  const age = getBand(AGE_BANDS, answers.age);
  if (age && program.ageMax != null && age.min > program.ageMax) return false;
  const stage = getBand(STAGE_BANDS, answers.stage);
  if (stage) {
    if (program.minYears != null && stage.max < program.minYears) return false;
    if (program.maxYears != null && stage.min > program.maxYears) return false;
  }
  const revenue = getBand(REVENUE_BANDS, answers.revenue);
  if (revenue && program.revenueMax != null && revenue.min > program.revenueMax) return false;
  return true;
}

function scorePrograms(answers) {
  const interests = answers.interest || [];
  return SAMPLE_PROGRAMS.filter((p) => isEligible(p, answers))
    .map((p) => {
      let score = 0;
      if (p.region === answers.region) score += 1;
      if (p.interest.some((i) => interests.includes(i))) score += 2;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score || a.dday - b.dday);
}

function PolicyDetail({ goBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ interest: [] });
  const [done, setDone] = useState(false);

  const current = POLICY_STEPS[step];
  const progress = done ? 100 : Math.round((step / POLICY_STEPS.length) * 100);

  const isSelected = (optId) => {
    if (!current) return false;
    if (current.type === "multi") return (answers[current.key] || []).includes(optId);
    return answers[current.key] === optId;
  };
  const canProceed = () => {
    if (!current) return false;
    if (current.type === "multi") return (answers[current.key] || []).length > 0;
    return !!answers[current.key];
  };
  const select = (optId) => {
    if (current.type === "multi") {
      const list = answers[current.key] || [];
      const next = list.includes(optId) ? list.filter((x) => x !== optId) : [...list, optId];
      setAnswers({ ...answers, [current.key]: next });
    } else {
      setAnswers({ ...answers, [current.key]: optId });
    }
  };
  const goNext = () => {
    if (step === POLICY_STEPS.length - 1) setDone(true);
    else setStep(step + 1);
  };
  const handleBack = () => {
    if (done) { setDone(false); return; }
    if (step > 0) { setStep(step - 1); return; }
    goBack();
  };

  const results = useMemo(() => (done ? scorePrograms(answers) : []), [done, answers]);
  const excludedCount = done ? SAMPLE_PROGRAMS.length - results.length : 0;

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 0 4px" }}>
        <button
          onClick={handleBack}
          style={{ width: 34, height: 34, borderRadius: 10, border: "none", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 2px rgba(16,24,43,0.06)", flexShrink: 0 }}
        >
          <ChevronLeft size={18} color="#10182B" />
        </button>
        <div style={{ flex: 1, height: 6, background: "#E3E9F3", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#0A6E5D", borderRadius: 999, transition: "width 0.35s ease" }} />
        </div>
      </div>

      {!done ? (
        <div key={step} style={{ animation: "fadeSlide 0.28s ease", marginTop: 16 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: "#0A6E5D", fontWeight: 700, marginBottom: 8 }}>{step + 1} / {POLICY_STEPS.length}</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{current.title}</h1>
            <p style={{ fontSize: 13.5, color: "#64708A", marginTop: 6 }}>{current.subtitle}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {current.options.map((opt) => {
              const sel = isSelected(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => select(opt.id)}
                  style={{
                    textAlign: "left", padding: "16px", borderRadius: 14,
                    border: sel ? "1.5px solid #0A6E5D" : "1.5px solid transparent",
                    background: sel ? "#E4F3EF" : "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    boxShadow: sel ? "none" : "0 1px 2px rgba(16,24,43,0.05)", transition: "all 0.15s ease",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 700 }}>{opt.label}</div>
                    {opt.desc && <div style={{ fontSize: 12.5, color: "#64708A", marginTop: 2 }}>{opt.desc}</div>}
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: sel ? "none" : "1.5px solid #C7D0E0", background: sel ? "#0A6E5D" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {sel && <Check size={13} color="#fff" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={goNext}
            disabled={!canProceed()}
            style={{
              marginTop: 26, width: "100%", padding: "16px 0", borderRadius: 14, border: "none",
              background: canProceed() ? "#10182B" : "#D7DDE9", color: "#fff", fontSize: 16, fontWeight: 700,
              cursor: canProceed() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {step === POLICY_STEPS.length - 1 ? "맞춤 결과 보기" : "다음"}
            <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div style={{ animation: "fadeSlide 0.28s ease", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Sparkles size={16} color="#0A6E5D" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0A6E5D" }}>맞춤 결과 {results.length}건</span>
          </div>
          <h1 style={{ fontSize: 21, fontWeight: 800, margin: "0 0 8px" }}>지금 신청할 수 있는 지원사업</h1>
          {excludedCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#64708A", marginBottom: 16 }}>
              <Info size={13} />
              연령·업력·매출 조건에 안 맞는 {excludedCount}건은 제외했어요
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: excludedCount > 0 ? 0 : 20 }}>
            {results.map((p) => (
              <div key={p.id} style={{ background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64708A" }}>
                    <Building2 size={13} />{p.org}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: p.dday <= 7 ? "#FF6A45" : "#64708A", flexShrink: 0 }}>
                    <Clock size={12} />D-{p.dday}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, margin: "8px 0 4px", lineHeight: 1.4 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "#0A6E5D", fontWeight: 600 }}>{p.amount}</div>
              </div>
            ))}
            {results.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#64708A", fontSize: 14 }}>조건에 맞는 지원사업을 찾지 못했어요.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── 온보딩 / 로그인 ───────────────────────── */

const ONBOARD_SLIDES = [
  {
    icon: Calculator,
    accent: "#0A6E5D",
    accentBg: "#E4F3EF",
    title: "장부 정리, 손으로 안 해도 돼요",
    desc: "재료 등록하면 메뉴 원가가 자동으로 계산되고, 할인 붙였을 때 얼마 남는지 바로 보여드려요.",
  },
  {
    icon: Wallet,
    accent: "#3B5BDB",
    accentBg: "#EAF0FE",
    title: "직원 급여, 헷갈리지 않게",
    desc: "3.3%든 4대보험이든 한 번 등록해두면 스케줄부터 급여 명세서까지 알아서 정리돼요.",
  },
  {
    icon: Sparkles,
    accent: "#D97706",
    accentBg: "#FFF3E0",
    title: "놓치기 쉬운 지원사업까지",
    desc: "조건 몇 개만 골라두면 우리 가게에 맞는 지원사업을 계속 찾아드려요.",
  },
];

function OnboardingScreen({ onDone }) {
  const [idx, setIdx] = useState(0);
  const slide = ONBOARD_SLIDES[idx];
  const Icon = slide.icon;
  const isLast = idx === ONBOARD_SLIDES.length - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "20px 20px 28px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div
          key={idx}
          style={{
            width: 88, height: 88, borderRadius: 24, background: slide.accentBg,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28,
            animation: "fadeSlide 0.3s ease",
          }}
        >
          <Icon size={38} color={slide.accent} />
        </div>
        <h1 key={"t" + idx} style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.4, margin: "0 0 10px", animation: "fadeSlide 0.3s ease" }}>
          {slide.title}
        </h1>
        <p key={"d" + idx} style={{ fontSize: 14, color: "#64708A", lineHeight: 1.6, margin: 0, maxWidth: 300, animation: "fadeSlide 0.3s ease" }}>
          {slide.desc}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 22 }}>
        {ONBOARD_SLIDES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === idx ? 20 : 6, height: 6, borderRadius: 999,
              background: i === idx ? "#10182B" : "#D7DDE9", transition: "all 0.2s ease",
            }}
          />
        ))}
      </div>

      <button
        onClick={() => (isLast ? onDone() : setIdx(idx + 1))}
        style={{
          width: "100%", padding: "16px 0", borderRadius: 14, border: "none", background: "#10182B",
          color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        {isLast ? "시작하기" : "다음"}
        <ArrowRight size={17} />
      </button>
      {!isLast && (
        <button
          onClick={onDone}
          style={{ marginTop: 12, background: "transparent", border: "none", color: "#A6AEC1", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          건너뛰기
        </button>
      )}
    </div>
  );
}

function LoginScreen() {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  const submit = async () => {
    setError("");
    if (!email || !pw) {
      setError("이메일과 비밀번호를 입력해주세요");
      return;
    }
    setLoading(true);
    if (mode === "login") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (err) setError(err.message === "Invalid login credentials" ? "이메일 또는 비밀번호가 맞지 않아요" : err.message);
    } else {
      const { error: err } = await supabase.auth.signUp({ email, password: pw });
      if (err) setError(err.message);
      else setSignupDone(true);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "40px 24px 28px" }}>
      <div
        style={{
          width: 44, height: 44, borderRadius: 12, background: "#10182B",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
        }}
      >
        <Store size={22} color="#fff" />
      </div>
      <h1 style={{ fontSize: 23, fontWeight: 800, margin: "0 0 6px" }}>
        {mode === "login" ? "로그인" : "계정 만들기"}
      </h1>
      <p style={{ fontSize: 13.5, color: "#64708A", margin: "0 0 28px" }}>
        장부 · 페이로그 · 지원사업, 계정 하나로 다 확인해요
      </p>

      {signupDone ? (
        <div style={{ background: "#E4F3EF", borderRadius: 12, padding: 16, fontSize: 13.5, color: "#0A6E5D", lineHeight: 1.6 }}>
          가입 확인 메일을 보냈어요. 메일함에서 인증 링크를 눌러주세요, 그 다음 로그인하시면 돼요.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 8 }}>
            <label style={{ display: "block" }}>
              <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>이메일</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 11, border: "1.5px solid #E3E9F3", fontSize: 14.5 }}
              />
            </label>
            <label style={{ display: "block" }}>
              <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>비밀번호</div>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="8자 이상"
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 11, border: "1.5px solid #E3E9F3", fontSize: 14.5 }}
              />
            </label>
          </div>

          {error && <div style={{ fontSize: 12.5, color: "#FF6A45", marginBottom: 12 }}>{error}</div>}

          <button
            onClick={submit}
            disabled={loading}
            style={{
              width: "100%", padding: "16px 0", borderRadius: 14, border: "none", background: "#10182B",
              color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 8, marginBottom: 14,
            }}
          >
            {loading ? "처리 중..." : mode === "login" ? "로그인" : "가입하고 시작하기"}
          </button>

          <div style={{ textAlign: "center", fontSize: 13, color: "#64708A" }}>
            {mode === "login" ? (
              <>
                계정이 없으신가요?{" "}
                <button onClick={() => setMode("signup")} style={{ background: "none", border: "none", color: "#0A6E5D", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                  회원가입
                </button>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{" "}
                <button onClick={() => setMode("login")} style={{ background: "none", border: "none", color: "#0A6E5D", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                  로그인
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ───────────────────────── 루트 ───────────────────────── */

export default function App() {
  const [phase, setPhase] = useState("loading"); // loading | onboarding | login | app
  const [screen, setScreen] = useState("home");

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setPhase(session ? "app" : "onboarding");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setPhase(session ? "app" : "onboarding");
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (phase === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#F3F6FB", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard Variable', Pretendard, sans-serif", color: "#64708A", fontSize: 13.5 }}>
        불러오는 중...
      </div>
    );
  }

  if (phase === "onboarding") {
    return (
      <div style={{ minHeight: "100%", background: "#F3F6FB", fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif", color: "#10182B", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <OnboardingScreen onDone={() => setPhase("login")} />
        </div>
        <style>{`
          @import url("https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/variable/pretendardvariable-dynamic-subset.min.css");
          @keyframes fadeSlide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          button { font-family: inherit; }
        `}</style>
      </div>
    );
  }

  if (phase === "login") {
    return (
      <div style={{ minHeight: "100%", background: "#F3F6FB", fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif", color: "#10182B", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <LoginScreen />
        </div>
        <style>{`
          @import url("https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/variable/pretendardvariable-dynamic-subset.min.css");
          input:focus { outline: none; border-color: #0A6E5D !important; }
          button { font-family: inherit; }
        `}</style>
      </div>
    );
  }



  return (
    <div
      style={{
        minHeight: "100%",
        background: "#F3F6FB",
        fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif",
        color: "#10182B",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1, paddingBottom: 90 }}>
          {screen === "home" && <HomeScreen goTo={setScreen} />}
          {screen === "gagye" && <GagyeDetail goBack={() => setScreen("home")} />}
          {screen === "paylog" && <PaylogDetail goBack={() => setScreen("home")} />}
          {screen === "policy" && <PolicyDetail goBack={() => setScreen("home")} />}
        </div>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            maxWidth: 420,
            background: "#fff",
            borderTop: "1px solid #E9EDF5",
            display: "flex",
            padding: "10px 8px calc(10px + env(safe-area-inset-bottom))",
          }}
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = screen === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setScreen(t.id)}
                style={{ flex: 1, border: "none", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 0" }}
              >
                <Icon size={19} color={active ? "#0A6E5D" : "#A6AEC1"} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: active ? "#0A6E5D" : "#A6AEC1" }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url("https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/variable/pretendardvariable-dynamic-subset.min.css");
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        input:focus { outline: none; border-color: #0A6E5D !important; }
        button { font-family: inherit; }
      `}</style>
    </div>
  );
}
