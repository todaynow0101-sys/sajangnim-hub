import React, { useState, useMemo } from "react";
import { supabase } from "./supabaseClient";
import html2canvas from "html2canvas";
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
  LogOut,
  GripVertical,
  ArrowDownAZ,
  ArrowUpAZ,
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
            onClick={() => supabase.auth.signOut()}
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
              cursor: "pointer",
            }}
            title="로그아웃"
          >
            <LogOut size={15} color="#10182B" />
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

const emptyChannelForm = { name: "", fee_percent: "", delivery_fee: "0", card_fee_percent: "0" };

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

// 재료 단가 = (구매가 + 배송비) ÷ 구매수량  (재료 구매단위 기준, 예: kg당 얼마)
function ingredientUnitCost(ing) {
  if (!ing) return 0;
  return (Number(ing.purchase_price) + Number(ing.shipping_fee || 0)) / Number(ing.purchase_qty || 1);
}

// 대소문자·표기 차이 없이 같은 단위로 인식되도록 정규화 (G, ｇ, 그램 → g 등)
const UNIT_ALIASES = {
  kg: "kg", 킬로: "kg", 키로: "kg", 킬로그램: "kg",
  g: "g", 그램: "g", 그람: "g",
  mg: "mg",
  l: "l", ℓ: "l", 리터: "l",
  ml: "ml", 미리: "ml", 밀리: "ml", 밀리리터: "ml",
};
function normalizeUnit(u) {
  if (!u) return u;
  const key = String(u).trim().toLowerCase();
  return UNIT_ALIASES[key] || key;
}

// 단위는 직접 입력 대신 이 목록에서 선택 (오타/대소문자 문제 원천 차단)
const UNIT_OPTIONS = ["kg", "g", "mg", "l", "ml", "개", "팩", "봉지", "병", "모", "장", "판"];

// 표준 단위 환산 (그램/밀리리터 기준값). 구매단위와 사용단위가 이 표에 둘 다 있으면 자동 환산.
const UNIT_TO_BASE = { kg: 1000, g: 1, mg: 0.001, l: 1000, ml: 1 };

// fromUnit(구매단위) 1개가 toUnit(사용단위)으로 몇 개인지. 환산표에 없는 조합(개, 팩 등)은 1로 처리.
function conversionFactor(fromUnit, toUnit) {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);
  if (!from || !to || from === to) return 1;
  const f = UNIT_TO_BASE[from];
  const t = UNIT_TO_BASE[to];
  if (f && t) return f / t;
  return 1;
}

// 메뉴 원가 = Σ (재료단가 ÷ 단위환산 × 사용량 ÷ divide_by)
// divide_by는 "1팩을 12등분해서 1개 사용" 같은 등분 계산에 쓰임 (단위 환산과는 별개)
function computeMenuCost(menuId, menuIngredients, ingredientsById) {
  return menuIngredients
    .filter((mi) => mi.menu_id === menuId)
    .reduce((sum, mi) => {
      const ing = ingredientsById[mi.ingredient_id];
      if (!ing) return sum;
      const unitCost = ingredientUnitCost(ing); // 구매단위(예: kg)당 가격
      const factor = conversionFactor(ing.unit, mi.unit); // 구매단위 1개 = 사용단위 factor개
      const costPerRecipeUnit = unitCost / (factor || 1);
      const divideBy = Number(mi.divide_by) || 1;
      return sum + (costPerRecipeUnit * Number(mi.amount_used)) / divideBy;
    }, 0);
}

function useGagyeData() {
  const [ingredients, setIngredients] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuIngredients, setMenuIngredients] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    const [ingRes, menuRes, miRes, chRes] = await Promise.all([
      supabase.from("gagye_ingredients").select("*").order("sort_order", { ascending: true }),
      supabase.from("gagye_menus").select("*").order("sort_order", { ascending: true }),
      supabase.from("gagye_menu_ingredients").select("*"),
      supabase.from("gagye_channels").select("*").order("created_at", { ascending: true }),
    ]);
    if (ingRes.error || menuRes.error || miRes.error || chRes.error) {
      setError((ingRes.error || menuRes.error || miRes.error || chRes.error).message);
    } else {
      setIngredients(ingRes.data || []);
      setMenus(menuRes.data || []);
      setMenuIngredients(miRes.data || []);
      setChannels(chRes.data || []);
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

  return { ingredients, menus, menuIngredients, channels, ingredientsById, loading, error, reload };
}

function EmptyState({ text }) {
  return <div style={{ textAlign: "center", padding: "30px 0", color: "#64708A", fontSize: 13.5 }}>{text}</div>;
}

// 순서 변경(드래그/정렬) 결과를 sort_order 컬럼에 반영
async function persistOrder(table, orderedItems) {
  await Promise.all(orderedItems.map((item, idx) => supabase.from(table).update({ sort_order: idx }).eq("id", item.id)));
}

function SortDropdown({ onSort }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
      <select
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) onSort(e.target.value);
          e.target.value = "";
        }}
        style={{ width: 110, boxSizing: "border-box", padding: "6px 8px", borderRadius: 8, border: "1.5px solid #E3E9F3", fontSize: 12, fontWeight: 600, color: "#64708A", background: "#fff" }}
      >
        <option value="" disabled>가격 정렬</option>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
    </div>
  );
}

const emptyIngForm = { name: "", purchase_price: "", purchase_qty: "", unit: "kg", shipping_fee: "0" };

function IngredientsTab({ data }) {
  const { ingredients, loading, error, reload } = data;
  const [editingId, setEditingId] = useState(null); // null | "new" | ingredient.id
  const [form, setForm] = useState(emptyIngForm);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [saveError, setSaveError] = useState("");

  const openNew = () => {
    setForm(emptyIngForm);
    setSaveError("");
    setEditingId("new");
  };

  const openEdit = (ing) => {
    setForm({
      name: ing.name,
      purchase_price: String(ing.purchase_price),
      purchase_qty: String(ing.purchase_qty),
      unit: ing.unit,
      shipping_fee: String(ing.shipping_fee ?? 0),
    });
    setSaveError("");
    setEditingId(ing.id);
  };

  const save = async () => {
    setSaveError("");
    if (!form.name) { setSaveError("재료명을 입력해주세요"); return; }
    if (!form.purchase_price) { setSaveError("구매가를 입력해주세요"); return; }
    if (!form.purchase_qty) { setSaveError("구매수량을 입력해주세요"); return; }
    setSaving(true);
    const payload = {
      name: form.name,
      purchase_price: Number(form.purchase_price),
      purchase_qty: Number(form.purchase_qty),
      unit: form.unit,
      shipping_fee: Number(form.shipping_fee) || 0,
    };
    let err;
    if (editingId === "new") {
      const { data: userData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !userData?.user) {
        setSaving(false);
        setSaveError("로그인 정보를 확인할 수 없어요. 다시 로그인해주세요.");
        return;
      }
      ({ error: err } = await supabase.from("gagye_ingredients").insert({ ...payload, user_id: userData.user.id, sort_order: ingredients.length }));
    } else {
      ({ error: err } = await supabase.from("gagye_ingredients").update(payload).eq("id", editingId));
    }
    setSaving(false);
    if (err) {
      setSaveError(err.message);
    } else {
      setEditingId(null);
      reload();
    }
  };

  const remove = async (id) => {
    if (!window.confirm("이 재료를 삭제할까요? 이 재료를 쓰는 메뉴 구성에서도 같이 사라져요.")) return;
    setSaving(true);
    await supabase.from("gagye_ingredients").delete().eq("id", id);
    setSaving(false);
    setEditingId(null);
    reload();
  };

  const handleDrop = async (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) { setDragIndex(null); return; }
    const reordered = [...ingredients];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setDragIndex(null);
    await persistOrder("gagye_ingredients", reordered);
    reload();
  };

  const applySort = async (dir) => {
    const sorted = [...ingredients].sort((a, b) => {
      const diff = ingredientUnitCost(a) - ingredientUnitCost(b);
      return dir === "asc" ? diff : -diff;
    });
    await persistOrder("gagye_ingredients", sorted);
    reload();
  };

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {ingredients.length > 1 && <SortDropdown onSort={applySort} />}
      {ingredients.length === 0 && editingId !== "new" && <EmptyState text="등록된 재료가 없어요" />}
      {ingredients.map((ing, idx) =>
        editingId === ing.id ? (
          <IngredientForm key={ing.id} form={form} setForm={setForm} onCancel={() => setEditingId(null)} onSave={save} onDelete={() => remove(ing.id)} saving={saving} isNew={false} error={saveError} />
        ) : (
          <div
            key={ing.id}
            draggable
            onDragStart={() => setDragIndex(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            style={{ opacity: dragIndex === idx ? 0.4 : 1, display: "flex", alignItems: "stretch", gap: 4 }}
          >
            <div style={{ display: "flex", alignItems: "center", cursor: "grab", color: "#C7D0E0", padding: "0 2px" }}>
              <GripVertical size={16} />
            </div>
            <button
              onClick={() => openEdit(ing)}
              style={{ flex: 1, textAlign: "left", background: "#fff", border: "none", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{ing.name}</div>
                <div style={{ fontSize: 12, color: "#64708A", marginTop: 2 }}>
                  {ing.purchase_qty}{ing.unit}당 {Number(ing.purchase_price).toLocaleString()}원
                  {ing.shipping_fee > 0 ? ` (배송비 ${Number(ing.shipping_fee).toLocaleString()}원)` : ""}
                </div>
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0A6E5D", textAlign: "right" }}>
                {Math.round(ingredientUnitCost(ing)).toLocaleString()}원
                <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600 }}>{`/${ing.unit}`}</div>
              </div>
            </button>
          </div>
        )
      )}

      {editingId === "new" ? (
        <IngredientForm form={form} setForm={setForm} onCancel={() => setEditingId(null)} onSave={save} saving={saving} isNew={true} error={saveError} />
      ) : (
        <button onClick={openNew} style={dashedBtnStyle}>+ 재료 등록</button>
      )}
    </div>
  );
}

function IngredientForm({ form, setForm, onCancel, onSave, onDelete, saving, isNew, error }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", flexDirection: "column", gap: 8 }}>
      <div>
        <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600, marginBottom: 3 }}>재료명</div>
        <input placeholder="예: 삼겹살, 김치" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600, marginBottom: 3 }}>총 구매가</div>
          <input placeholder="예: 60000" type="number" value={form.purchase_price} onChange={(e) => setForm({ ...form, purchase_price: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600, marginBottom: 3 }}>총 수량</div>
          <input placeholder="예: 1500" type="number" value={form.purchase_qty} onChange={(e) => setForm({ ...form, purchase_qty: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ width: 90 }}>
          <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600, marginBottom: 3 }}>단위</div>
          <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} style={inputStyle}>
            {UNIT_OPTIONS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#A6AEC1", marginTop: -4 }}>
        박스·묶음으로 사셨으면 "총 구매가 ÷ 총 수량"이 되도록, 박스 안에 든 전체 개수(또는 kg)를 총 수량에 넣어주세요. 예: 6만원짜리 1박스에 1500개 들었으면 → 총 구매가 60000, 총 수량 1500, 단위 개
      </div>
      <div>
        <div style={{ fontSize: 10.5, color: "#A6AEC1", fontWeight: 600, marginBottom: 3 }}>배송비 (없으면 0)</div>
        <input placeholder="0" type="number" value={form.shipping_fee} onChange={(e) => setForm({ ...form, shipping_fee: e.target.value })} style={inputStyle} />
      </div>
      {error && <div style={{ fontSize: 12.5, color: "#FF6A45", fontWeight: 600 }}>{error}</div>}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {!isNew && (
          <button onClick={onDelete} disabled={saving} style={{ ...secondaryBtnStyle, color: "#FF6A45", borderColor: "#FFD9CC", flex: "0 0 auto", padding: "11px 14px" }}>삭제</button>
        )}
        <button onClick={onCancel} style={secondaryBtnStyle}>취소</button>
        <button onClick={onSave} disabled={saving} style={primaryBtnStyle}>{saving ? "저장 중..." : "저장"}</button>
      </div>
    </div>
  );
}

function MenuTab({ data }) {
  const { menus, menuIngredients, ingredients, ingredientsById, loading, error, reload } = data;
  const [editingId, setEditingId] = useState(null); // null | "new" | menu.id
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rows, setRows] = useState([]); // [{ingredient_id, amount_used, divide_by, unit}]
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  const openNew = () => {
    setName("");
    setPrice("");
    setRows([{ ingredient_id: ingredients[0]?.id || "", amount_used: "", divide_by: "1", unit: "g" }]);
    setEditingId("new");
  };

  const openEdit = (menu) => {
    const items = menuIngredients.filter((mi) => mi.menu_id === menu.id);
    setName(menu.name);
    setPrice(menu.price ? String(menu.price) : "");
    setRows(
      items.length
        ? items.map((mi) => ({ ingredient_id: mi.ingredient_id, amount_used: String(mi.amount_used), divide_by: String(mi.divide_by ?? 1), unit: mi.unit || "g" }))
        : [{ ingredient_id: ingredients[0]?.id || "", amount_used: "", divide_by: "1", unit: "g" }]
    );
    setEditingId(menu.id);
  };

  const addRow = () => setRows([...rows, { ingredient_id: ingredients[0]?.id || "", amount_used: "", divide_by: "1", unit: "g" }]);
  const removeRow = (idx) => setRows(rows.filter((_, i) => i !== idx));
  const updateRow = (idx, patch) => setRows(rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

  const save = async () => {
    if (!name) return;
    setSaving(true);
    const validRows = rows.filter((r) => r.ingredient_id && r.amount_used);
    const priceValue = Number(price) || 0;
    let menuId = editingId;
    if (editingId === "new") {
      const { data: userData } = await supabase.auth.getUser();
      const { data: inserted, error: err } = await supabase.from("gagye_menus").insert({ user_id: userData.user.id, name, price: priceValue, sort_order: menus.length }).select().single();
      if (err) { setSaving(false); return; }
      menuId = inserted.id;
    } else {
      await supabase.from("gagye_menus").update({ name, price: priceValue }).eq("id", editingId);
      await supabase.from("gagye_menu_ingredients").delete().eq("menu_id", editingId);
    }
    if (validRows.length > 0) {
      const { data: userData } = await supabase.auth.getUser();
      await supabase.from("gagye_menu_ingredients").insert(
        validRows.map((r) => ({
          menu_id: menuId,
          ingredient_id: r.ingredient_id,
          user_id: userData.user.id,
          amount_used: Number(r.amount_used),
          divide_by: Number(r.divide_by) || 1,
          unit: r.unit || null,
        }))
      );
    }
    setSaving(false);
    setEditingId(null);
    reload();
  };

  const remove = async (id) => {
    if (!window.confirm("이 메뉴를 삭제할까요?")) return;
    setSaving(true);
    await supabase.from("gagye_menus").delete().eq("id", id);
    setSaving(false);
    setEditingId(null);
    reload();
  };

  const handleDrop = async (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) { setDragIndex(null); return; }
    const reordered = [...menus];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setDragIndex(null);
    await persistOrder("gagye_menus", reordered);
    reload();
  };

  const applySort = async (dir) => {
    const sorted = [...menus].sort((a, b) => {
      const diff = Number(a.price || 0) - Number(b.price || 0);
      return dir === "asc" ? diff : -diff;
    });
    await persistOrder("gagye_menus", sorted);
    reload();
  };

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {menus.length > 1 && <SortDropdown onSort={applySort} />}
      {menus.length === 0 && editingId !== "new" && <EmptyState text="등록된 메뉴가 없어요" />}
      {menus.map((menu, idx) => {
        if (editingId === menu.id) {
          return (
            <MenuForm key={menu.id} name={name} setName={setName} price={price} setPrice={setPrice} rows={rows} ingredients={ingredients} addRow={addRow} removeRow={removeRow} updateRow={updateRow} onCancel={() => setEditingId(null)} onSave={save} onDelete={() => remove(menu.id)} saving={saving} isNew={false} />
          );
        }
        const items = menuIngredients.filter((mi) => mi.menu_id === menu.id);
        const cost = computeMenuCost(menu.id, menuIngredients, ingredientsById);
        return (
          <div
            key={menu.id}
            draggable
            onDragStart={() => setDragIndex(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            style={{ opacity: dragIndex === idx ? 0.4 : 1, display: "flex", alignItems: "stretch", gap: 4 }}
          >
            <div style={{ display: "flex", alignItems: "center", cursor: "grab", color: "#C7D0E0", padding: "0 2px" }}>
              <GripVertical size={16} />
            </div>
            <button
              onClick={() => openEdit(menu)}
              style={{ flex: 1, textAlign: "left", width: "100%", background: "#fff", border: "none", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)", cursor: "pointer" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{menu.name}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#10182B" }}>{Number(menu.price || 0).toLocaleString()}원</div>
              </div>
              <div style={{ fontSize: 12, color: "#64708A", marginBottom: 6 }}>
                {items.map((i) => ingredientsById[i.ingredient_id]?.name).filter(Boolean).join(" · ") || "구성 재료 없음"}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0A6E5D" }}>원가 {Math.round(cost).toLocaleString()}원</div>
            </button>
          </div>
        );
      })}

      {editingId === "new" ? (
        <MenuForm name={name} setName={setName} price={price} setPrice={setPrice} rows={rows} ingredients={ingredients} addRow={addRow} removeRow={removeRow} updateRow={updateRow} onCancel={() => setEditingId(null)} onSave={save} saving={saving} isNew={true} />
      ) : (
        <button onClick={openNew} style={dashedBtnStyle}>+ 메뉴 등록</button>
      )}
    </div>
  );
}

function MenuForm({ name, setName, price, setPrice, rows, ingredients, addRow, removeRow, updateRow, onCancel, onSave, onDelete, saving, isNew }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="메뉴명" value={name} onChange={(e) => setName(e.target.value)} style={{ ...inputStyle, flex: 2 }} />
        <input placeholder="판매가" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
      </div>

      <div style={{ fontSize: 12.5, color: "#64708A", fontWeight: 600 }}>구성 재료</div>
      <div style={{ fontSize: 11, color: "#A6AEC1", marginTop: -6 }}>
        여러 인분을 한 번에 만들 때는 "등분"에 전체를 몇으로 나누는지 넣어주세요 (예: 4kg으로 50인분 만들면 등분 50)
      </div>
      {rows.map((r, idx) => (
        <div key={idx} style={{ background: "#F3F6FB", borderRadius: 10, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <select value={r.ingredient_id} onChange={(e) => updateRow(idx, { ingredient_id: e.target.value })} style={{ ...inputStyle, flex: 1 }}>
              {ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>{ing.name}</option>
              ))}
            </select>
            <button onClick={() => removeRow(idx)} style={{ border: "none", background: "transparent", color: "#FF6A45", fontSize: 18, cursor: "pointer", padding: "0 4px" }}>×</button>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#A6AEC1", marginBottom: 2 }}>사용량</div>
              <input placeholder="80" type="number" value={r.amount_used} onChange={(e) => updateRow(idx, { amount_used: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#A6AEC1", marginBottom: 2 }}>단위</div>
              <select value={r.unit} onChange={(e) => updateRow(idx, { unit: e.target.value })} style={inputStyle}>
                {UNIT_OPTIONS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#A6AEC1", marginBottom: 2 }}>등분 (기본 1)</div>
              <input placeholder="1" type="number" value={r.divide_by} onChange={(e) => updateRow(idx, { divide_by: e.target.value })} style={inputStyle} />
            </div>
          </div>
        </div>
      ))}
      <button onClick={addRow} style={{ ...dashedBtnStyle, padding: "9px 0", fontSize: 12.5 }}>+ 재료 추가</button>

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {!isNew && (
          <button onClick={onDelete} disabled={saving} style={{ ...secondaryBtnStyle, color: "#FF6A45", borderColor: "#FFD9CC", flex: "0 0 auto", padding: "11px 14px" }}>삭제</button>
        )}
        <button onClick={onCancel} style={secondaryBtnStyle}>취소</button>
        <button onClick={onSave} disabled={saving} style={primaryBtnStyle}>{saving ? "저장 중..." : "저장"}</button>
      </div>
    </div>
  );
}

function ProfitTab({ data }) {
  const { menus, menuIngredients, ingredientsById, channels, loading, error, reload } = data;
  const [cart, setCart] = useState({}); // menuId -> { qty, price }
  const [discountType, setDiscountType] = useState("percent"); // percent | amount
  const [discount, setDiscount] = useState(0);
  const [channelId, setChannelId] = useState(null);
  const [managingChannels, setManagingChannels] = useState(false);

  React.useEffect(() => {
    if (!channelId && channels.length > 0) setChannelId(channels[0].id);
  }, [channels, channelId]);

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;
  if (menus.length === 0) return <EmptyState text="메뉴부터 등록해주세요" />;

  const toggleMenu = (menuId) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[menuId]) {
        delete next[menuId];
      } else {
        const menu = menus.find((m) => m.id === menuId);
        next[menuId] = { qty: 1, price: Number(menu?.price) || 0 };
      }
      return next;
    });
  };
  const updateCart = (menuId, patch) => setCart((prev) => ({ ...prev, [menuId]: { ...prev[menuId], ...patch } }));

  const cartEntries = Object.entries(cart);
  const totalCost = cartEntries.reduce((sum, [menuId, item]) => sum + computeMenuCost(menuId, menuIngredients, ingredientsById) * item.qty, 0);
  const totalPrice = cartEntries.reduce((sum, [, item]) => sum + Number(item.price || 0) * item.qty, 0);
  const discountedPrice =
    discountType === "percent"
      ? Math.round(totalPrice * (1 - discount / 100))
      : Math.max(0, Math.round(totalPrice - discount));

  const channel = channels.find((c) => c.id === channelId);
  const percentFee = channel ? Number(channel.fee_percent || 0) + Number(channel.card_fee_percent || 0) : 0;
  const flatFee = channel ? Number(channel.delivery_fee || 0) : 0;
  const feeAmount = Math.round((discountedPrice * percentFee) / 100) + flatFee;
  const net = discountedPrice - Math.round(totalCost) - feeAmount;
  const marginRate = discountedPrice > 0 ? ((net / discountedPrice) * 100).toFixed(1) : 0;

  return (
    <div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 1px 2px rgba(16,24,43,0.05)", marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 3, fontWeight: 600 }}>메뉴 담기 (여러 개 선택 가능)</div>
        <div style={{ fontSize: 11, color: "#A6AEC1", marginBottom: 10 }}>*판매가 · 원가 · 원가율</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {menus.map((m) => {
            const inCart = !!cart[m.id];
            const unitCost = computeMenuCost(m.id, menuIngredients, ingredientsById);
            const costRate = Number(m.price) > 0 ? ((unitCost / Number(m.price)) * 100).toFixed(1) : null;
            return (
              <div key={m.id} style={{ borderRadius: 12, border: inCart ? "1.5px solid #0A6E5D" : "1.5px solid #E3E9F3", background: inCart ? "#E4F3EF" : "#fff", overflow: "hidden" }}>
                <button
                  onClick={() => toggleMenu(m.id)}
                  style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "11px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>{m.name}</span>
                  <span style={{ fontSize: 12, color: "#64708A" }}>
                    판매가 {Number(m.price || 0).toLocaleString()}원 · 원가 {Math.round(unitCost).toLocaleString()}원{costRate ? `/${costRate}%` : ""}
                  </span>
                </button>
                {inCart && (
                  <div style={{ display: "flex", gap: 8, padding: "0 12px 12px" }}>
                    <label style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: "#64708A", marginBottom: 4 }}>수량</div>
                      <input type="number" min="1" value={cart[m.id].qty} onChange={(e) => updateCart(m.id, { qty: Number(e.target.value) || 1 })} style={inputStyle} />
                    </label>
                    <label style={{ flex: 2 }}>
                      <div style={{ fontSize: 11, color: "#64708A", marginBottom: 4 }}>개당 판매가</div>
                      <input type="number" value={cart[m.id].price} onChange={(e) => updateCart(m.id, { price: e.target.value })} style={inputStyle} />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {cartEntries.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <StatBox label="합산 판매가" value={`${totalPrice.toLocaleString()}원`} />
            <StatBox label="합산 원가" value={`${Math.round(totalCost).toLocaleString()}원`} />
            <StatBox label="원가율" value={totalPrice > 0 ? `${((totalCost / totalPrice) * 100).toFixed(1)}%` : "-"} />
          </div>

          <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>할인</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <div style={{ display: "flex", background: "#F3F6FB", borderRadius: 10, padding: 3, flex: 1 }}>
              {[
                { id: "percent", label: "정률(%)" },
                { id: "amount", label: "정액(원)" },
              ].map((t) => {
                const sel = discountType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setDiscountType(t.id)}
                    style={{
                      flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer",
                      fontSize: 12.5, fontWeight: 700, background: sel ? "#fff" : "transparent",
                      color: sel ? "#10182B" : "#7B8399", boxShadow: sel ? "0 1px 3px rgba(16,24,43,0.1)" : "none",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} style={{ ...inputStyle, flex: 1 }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ fontSize: 12.5, color: "#64708A", fontWeight: 600 }}>판매 채널</div>
            <button onClick={() => setManagingChannels(!managingChannels)} style={{ background: "none", border: "none", color: "#0A6E5D", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {managingChannels ? "닫기" : "채널 관리"}
            </button>
          </div>

          {channels.length > 0 && !managingChannels && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {channels.map((c) => {
                const sel = c.id === channelId;
                return (
                  <button key={c.id} onClick={() => setChannelId(c.id)} style={{ padding: "9px 14px", fontSize: 12.5, fontWeight: 700, borderRadius: 10, border: "none", cursor: "pointer", background: sel ? "#0A6E5D" : "#F3F6FB", color: sel ? "#fff" : "#64708A" }}>
                    {c.name}
                  </button>
                );
              })}
            </div>
          )}

          {managingChannels && <ChannelManager channels={channels} reload={reload} />}
          {!managingChannels && channels.length === 0 && (
            <div>
              <EmptyState text="등록된 채널이 없어요" />
              <ChannelManager channels={channels} reload={reload} />
            </div>
          )}
        </div>
      )}

      {cartEntries.length > 0 && channel && (
        <div style={{ background: "#10182B", borderRadius: 16, padding: 20, marginTop: 12, color: "#fff" }}>
          <div style={{ fontSize: 12.5, color: "#9AA5BD", marginBottom: 4 }}>할인 적용 후 예상 순이익</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{net.toLocaleString()}원</div>
          <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 12.5, color: "#C7D0E0", flexWrap: "wrap" }}>
            <span>마진율 {marginRate}%</span>
            <span>원가율 {discountedPrice > 0 ? ((totalCost / discountedPrice) * 100).toFixed(1) : 0}%</span>
            <span>할인가 {discountedPrice.toLocaleString()}원</span>
            <span>수수료 {feeAmount.toLocaleString()}원</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ChannelManager({ channels, reload }) {
  const [editingId, setEditingId] = useState(null); // null | "new" | channel.id
  const [form, setForm] = useState(emptyChannelForm);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setForm(emptyChannelForm);
    setEditingId("new");
  };
  const openEdit = (c) => {
    setForm({
      name: c.name,
      fee_percent: String(c.fee_percent ?? ""),
      delivery_fee: String(c.delivery_fee ?? 0),
      card_fee_percent: String(c.card_fee_percent ?? 0),
    });
    setEditingId(c.id);
  };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    const payload = {
      name: form.name,
      fee_percent: Number(form.fee_percent) || 0,
      delivery_fee: Number(form.delivery_fee) || 0,
      card_fee_percent: Number(form.card_fee_percent) || 0,
    };
    let err;
    if (editingId === "new") {
      const { data: userData } = await supabase.auth.getUser();
      ({ error: err } = await supabase.from("gagye_channels").insert({ ...payload, user_id: userData.user.id }));
    } else {
      ({ error: err } = await supabase.from("gagye_channels").update(payload).eq("id", editingId));
    }
    setSaving(false);
    if (!err) {
      setEditingId(null);
      reload();
    }
  };

  const remove = async (id) => {
    if (!window.confirm("이 채널을 삭제할까요?")) return;
    setSaving(true);
    await supabase.from("gagye_channels").delete().eq("id", id);
    setSaving(false);
    setEditingId(null);
    reload();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
      {channels.map((c) =>
        editingId === c.id ? (
          <ChannelForm key={c.id} form={form} setForm={setForm} onCancel={() => setEditingId(null)} onSave={save} onDelete={() => remove(c.id)} saving={saving} isNew={false} />
        ) : (
          <button
            key={c.id}
            onClick={() => openEdit(c)}
            style={{ textAlign: "left", background: "#F3F6FB", border: "none", borderRadius: 10, padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</span>
            <span style={{ fontSize: 11.5, color: "#64708A" }}>
              중개 {c.fee_percent}% · 카드 {c.card_fee_percent || 0}% · 배달비 {Number(c.delivery_fee || 0).toLocaleString()}원
            </span>
          </button>
        )
      )}
      {editingId === "new" ? (
        <ChannelForm form={form} setForm={setForm} onCancel={() => setEditingId(null)} onSave={save} saving={saving} isNew={true} />
      ) : (
        <button onClick={openNew} style={{ ...dashedBtnStyle, padding: "10px 0", fontSize: 12.5 }}>+ 채널 추가</button>
      )}
    </div>
  );
}

function ChannelForm({ form, setForm, onCancel, onSave, onDelete, saving, isNew }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid #E3E9F3", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      <input placeholder="채널명 (예: 쿠팡이츠)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      <div style={{ display: "flex", gap: 8 }}>
        <label style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#64708A", marginBottom: 3 }}>중개수수료(%)</div>
          <input type="number" value={form.fee_percent} onChange={(e) => setForm({ ...form, fee_percent: e.target.value })} style={inputStyle} />
        </label>
        <label style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#64708A", marginBottom: 3 }}>카드수수료(%)</div>
          <input type="number" value={form.card_fee_percent} onChange={(e) => setForm({ ...form, card_fee_percent: e.target.value })} style={inputStyle} />
        </label>
        <label style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#64708A", marginBottom: 3 }}>배달비 부담(원)</div>
          <input type="number" value={form.delivery_fee} onChange={(e) => setForm({ ...form, delivery_fee: e.target.value })} style={inputStyle} />
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {!isNew && (
          <button onClick={onDelete} disabled={saving} style={{ ...secondaryBtnStyle, color: "#FF6A45", borderColor: "#FFD9CC", flex: "0 0 auto", padding: "9px 12px" }}>삭제</button>
        )}
        <button onClick={onCancel} style={{ ...secondaryBtnStyle, padding: "9px 0" }}>취소</button>
        <button onClick={onSave} disabled={saving} style={{ ...primaryBtnStyle, padding: "9px 0" }}>{saving ? "저장 중..." : "저장"}</button>
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

/* ───────────────────────── 페이로그 상세 (Supabase 연동) ───────────────────────── */

const PAYLOG_TABS = [
  { id: "staff", label: "직원" },
  { id: "schedule", label: "스케줄" },
  { id: "payroll", label: "급여계산" },
];

const emptyEmployeeForm = {
  pay_type: "hourly",
  name: "",
  hourly_wage: "",
  monthly_salary: "",
  juhyu_included: false,
  tax33: false,
  ins_pension: false,
  ins_health: false,
  ins_employment: false,
  dependents: "",
};

function usePaylogEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase.from("employees").select("*").order("created_at", { ascending: true });
    if (err) setError(err.message);
    else setEmployees(data || []);
    setLoading(false);
  };

  React.useEffect(() => {
    reload();
  }, []);

  return { employees, loading, error, reload };
}

function TypeBadge({ children, tone }) {
  const tones = {
    blue: { bg: "#EAF0FE", color: "#3B5BDB" },
    orange: { bg: "#FFF3E0", color: "#D97706" },
    gray: { bg: "#F3F6FB", color: "#64708A" },
  };
  const t = tones[tone] || tones.gray;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: t.bg, color: t.color, flexShrink: 0 }}>
      {children}
    </span>
  );
}

function StaffTab({ paylog }) {
  const { employees, loading, error, reload } = paylog;
  const [editingId, setEditingId] = useState(null); // null | "new" | employee.id
  const [form, setForm] = useState(emptyEmployeeForm);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setForm(emptyEmployeeForm);
    setEditingId("new");
  };
  const openEdit = (emp) => {
    setForm({
      pay_type: emp.pay_type || "hourly",
      name: emp.name || "",
      hourly_wage: emp.hourly_wage != null ? String(emp.hourly_wage) : "",
      monthly_salary: emp.monthly_salary != null ? String(emp.monthly_salary) : "",
      juhyu_included: !!emp.juhyu_included,
      tax33: !!emp.tax33,
      ins_pension: !!emp.ins_pension,
      ins_health: !!emp.ins_health,
      ins_employment: !!emp.ins_employment,
      dependents: emp.dependents != null ? String(emp.dependents) : "",
    });
    setEditingId(emp.id);
  };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    const payload = {
      pay_type: form.pay_type,
      name: form.name,
      hourly_wage: form.pay_type === "hourly" ? Number(form.hourly_wage) || 0 : null,
      monthly_salary: form.pay_type === "monthly" ? Number(form.monthly_salary) || 0 : null,
      juhyu_included: form.juhyu_included,
      tax33: form.tax33,
      ins_pension: form.ins_pension,
      ins_health: form.ins_health,
      ins_employment: form.ins_employment,
      dependents: form.dependents ? Number(form.dependents) : null,
    };
    let err;
    if (editingId === "new") {
      const { data: userData } = await supabase.auth.getUser();
      ({ error: err } = await supabase.from("employees").insert({ ...payload, user_id: userData.user.id }));
    } else {
      ({ error: err } = await supabase.from("employees").update(payload).eq("id", editingId));
    }
    setSaving(false);
    if (!err) {
      setEditingId(null);
      reload();
    }
  };

  const remove = async (id) => {
    if (!window.confirm("이 직원을 삭제할까요? 스케줄 기록도 같이 사라져요.")) return;
    setSaving(true);
    await supabase.from("employees").delete().eq("id", id);
    setSaving(false);
    setEditingId(null);
    reload();
  };

  if (loading) return <EmptyState text="불러오는 중..." />;
  if (error) return <EmptyState text={`불러오기 실패: ${error}`} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {employees.length === 0 && editingId !== "new" && <EmptyState text="등록된 직원이 없어요" />}
      {employees.map((emp) =>
        editingId === emp.id ? (
          <EmployeeForm key={emp.id} form={form} setForm={setForm} onCancel={() => setEditingId(null)} onSave={save} onDelete={() => remove(emp.id)} saving={saving} isNew={false} />
        ) : (
          <button
            key={emp.id}
            onClick={() => openEdit(emp)}
            style={{ textAlign: "left", background: "#fff", border: "none", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14.5, fontWeight: 700 }}>{emp.name}</span>
              <TypeBadge tone="blue">{emp.pay_type === "hourly" ? "시급제" : "월급제"}</TypeBadge>
              {emp.tax33 && <TypeBadge tone="orange">3.3%</TypeBadge>}
              {(emp.ins_pension || emp.ins_health || emp.ins_employment) && <TypeBadge tone="gray">4대보험</TypeBadge>}
            </div>
            <div style={{ fontSize: 13, color: "#64708A" }}>
              {emp.pay_type === "hourly" ? `${Number(emp.hourly_wage || 0).toLocaleString()}원/시간` : `월 ${Number(emp.monthly_salary || 0).toLocaleString()}원`}
            </div>
          </button>
        )
      )}
      {editingId === "new" ? (
        <EmployeeForm form={form} setForm={setForm} onCancel={() => setEditingId(null)} onSave={save} saving={saving} isNew={true} />
      ) : (
        <button onClick={openNew} style={dashedBtnStyle}>+ 직원 추가</button>
      )}
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#F3F6FB", borderRadius: 10 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
        {desc && <div style={{ fontSize: 11, color: "#64708A", marginTop: 2 }}>{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{ width: 40, height: 24, borderRadius: 999, border: "none", cursor: "pointer", background: checked ? "#10182B" : "#D7DDE9", position: "relative", flexShrink: 0 }}
      >
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 19 : 3, transition: "left 0.15s ease" }} />
      </button>
    </div>
  );
}

function EmployeeForm({ form, setForm, onCancel, onSave, onDelete, saving, isNew }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 1px 2px rgba(16,24,43,0.05)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[
          { id: "hourly", label: "시급제" },
          { id: "monthly", label: "월급제" },
        ].map((t) => {
          const sel = form.pay_type === t.id;
          return (
            <button key={t.id} onClick={() => setForm({ ...form, pay_type: t.id })} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: sel ? "#10182B" : "#F3F6FB", color: sel ? "#fff" : "#64708A" }}>
              {t.label}
            </button>
          );
        })}
      </div>
      <input placeholder="이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      {form.pay_type === "hourly" ? (
        <input placeholder="시급(원)" type="number" value={form.hourly_wage} onChange={(e) => setForm({ ...form, hourly_wage: e.target.value })} style={inputStyle} />
      ) : (
        <input placeholder="월급(원)" type="number" value={form.monthly_salary} onChange={(e) => setForm({ ...form, monthly_salary: e.target.value })} style={inputStyle} />
      )}
      <ToggleRow label="주휴수당 포함 대상" desc="주 15시간 이상 근무 시 해당" checked={form.juhyu_included} onChange={(v) => setForm({ ...form, juhyu_included: v })} />
      <ToggleRow label="3.3% 원천징수 적용" desc="소득세 3% + 지방소득세 0.3%" checked={form.tax33} onChange={(v) => setForm({ ...form, tax33: v })} />
      <ToggleRow label="국민연금 공제" checked={form.ins_pension} onChange={(v) => setForm({ ...form, ins_pension: v })} />
      <ToggleRow label="건강보험 공제" checked={form.ins_health} onChange={(v) => setForm({ ...form, ins_health: v })} />
      <ToggleRow label="고용보험 공제" checked={form.ins_employment} onChange={(v) => setForm({ ...form, ins_employment: v })} />
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {!isNew && (
          <button onClick={onDelete} disabled={saving} style={{ ...secondaryBtnStyle, color: "#FF6A45", borderColor: "#FFD9CC", flex: "0 0 auto", padding: "11px 14px" }}>삭제</button>
        )}
        <button onClick={onCancel} style={secondaryBtnStyle}>취소</button>
        <button onClick={onSave} disabled={saving} style={primaryBtnStyle}>{saving ? "저장 중..." : "저장"}</button>
      </div>
    </div>
  );
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function ScheduleTab({ paylog }) {
  const { employees, loading: empLoading } = paylog;
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [employeeId, setEmployeeId] = useState(null);
  const [rows, setRows] = useState({}); // day -> { id?, hours }
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [copying, setCopying] = useState(false);

  React.useEffect(() => {
    if (!employeeId && employees.length > 0) setEmployeeId(employees[0].id);
  }, [employees, employeeId]);

  const loadSchedule = async () => {
    if (!employeeId) return;
    setLoading(true);
    const { data, error: err } = await supabase.from("schedules").select("*").eq("employee_id", employeeId).eq("year", year).eq("month", month);
    if (err) setSaveError(err.message);
    const map = {};
    (data || []).forEach((r) => { map[r.day_of_month] = { id: r.id, hours: String(r.hours) }; });
    setRows(map);
    setLoading(false);
  };

  React.useEffect(() => {
    loadSchedule();
    // eslint-disable-next-line
  }, [employeeId, year, month]);

  const updateHour = (day, hours) => setRows((prev) => ({ ...prev, [day]: { ...prev[day], hours } }));

  const saveAll = async () => {
    if (!employeeId) return;
    setSaveError("");
    setSaving(true);
    const { data: userData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !userData?.user) {
      setSaving(false);
      setSaveError("로그인 정보를 확인할 수 없어요. 다시 로그인해주세요.");
      return;
    }
    const days = Object.keys(rows);
    const errors = [];
    await Promise.all(
      days.map(async (day) => {
        const row = rows[day];
        const hoursVal = Number(row.hours) || 0;
        let res;
        if (row.id) {
          res = await supabase.from("schedules").update({ hours: hoursVal }).eq("id", row.id);
        } else if (hoursVal > 0) {
          res = await supabase.from("schedules").insert({ employee_id: employeeId, user_id: userData.user.id, year, month, day_of_month: Number(day), hours: hoursVal });
        }
        if (res?.error) errors.push(res.error.message);
      })
    );
    setSaving(false);
    if (errors.length > 0) {
      setSaveError(errors[0]);
    } else {
      loadSchedule();
    }
  };

  // 지난달 근무 패턴을 요일 기준으로 이번 달에 복사 (일요일→일요일, 화요일→화요일 ...)
  const copyLastMonth = async () => {
    if (!employeeId) return;
    setCopying(true);
    setSaveError("");
    let prevYear = year, prevMonth = month - 1;
    if (prevMonth === 0) { prevMonth = 12; prevYear = year - 1; }
    const { data, error: err } = await supabase.from("schedules").select("day_of_month, hours").eq("employee_id", employeeId).eq("year", prevYear).eq("month", prevMonth);
    setCopying(false);
    if (err) { setSaveError(err.message); return; }
    if (!data || data.length === 0) { setSaveError("지난달 근무 기록이 없어요"); return; }

    // 요일별로 가장 많이 나온 근무시간을 대표값으로
    const byWeekday = {};
    data.forEach((r) => {
      const dow = new Date(prevYear, prevMonth - 1, r.day_of_month).getDay();
      byWeekday[dow] = byWeekday[dow] || {};
      const key = String(r.hours);
      byWeekday[dow][key] = (byWeekday[dow][key] || 0) + 1;
    });
    const weekdayHours = {};
    Object.entries(byWeekday).forEach(([dow, counts]) => {
      let best = null, bestCount = -1;
      Object.entries(counts).forEach(([h, c]) => { if (c > bestCount) { best = h; bestCount = c; } });
      weekdayHours[dow] = best;
    });

    const total = daysInMonth(year, month);
    setRows((prev) => {
      const next = { ...prev };
      for (let day = 1; day <= total; day++) {
        const dow = new Date(year, month - 1, day).getDay();
        if (weekdayHours[dow] != null && Number(weekdayHours[dow]) > 0) {
          next[day] = { id: prev[day]?.id, hours: weekdayHours[dow] };
        }
      }
      return next;
    });
  };

  if (empLoading) return <EmptyState text="불러오는 중..." />;
  if (employees.length === 0) return <EmptyState text="먼저 직원을 등록해주세요" />;

  const total = daysInMonth(year, month);
  const firstWeekday = new Date(year, month - 1, 1).getDay(); // 0=일 ~ 6=토
  const totalHours = Object.values(rows).reduce((sum, r) => sum + (Number(r.hours) || 0), 0);
  const selectOnFocus = (e) => e.target.select();

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <select value={employeeId || ""} onChange={(e) => setEmployeeId(e.target.value)} style={{ ...inputStyle, flex: 2 }}>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        <input type="number" value={year} onFocus={selectOnFocus} onChange={(e) => setYear(Number(e.target.value) || now.getFullYear())} style={{ ...inputStyle, flex: 1 }} />
        <input type="number" value={month} min="1" max="12" onFocus={selectOnFocus} onChange={(e) => setMonth(Number(e.target.value) || 1)} style={{ ...inputStyle, flex: 1 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, color: "#64708A" }}>이번 달 합계 {totalHours}시간</span>
        <button onClick={copyLastMonth} disabled={copying} style={{ background: "none", border: "none", color: "#0A6E5D", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          {copying ? "불러오는 중..." : "지난달 복사"}
        </button>
      </div>

      {saveError && <div style={{ fontSize: 12.5, color: "#FF6A45", fontWeight: 600, marginBottom: 10 }}>{saveError}</div>}

      {loading ? (
        <EmptyState text="불러오는 중..." />
      ) : (
        <div style={{ background: "#fff", borderRadius: 14, padding: 10, boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 }}>
            {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: i === 0 ? "#FF6A45" : i === 6 ? "#3B5BDB" : "#64708A", padding: "4px 0" }}>
                {d}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {Array.from({ length: firstWeekday }, (_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {Array.from({ length: total }, (_, i) => i + 1).map((day) => {
              const dow = (firstWeekday + (day - 1)) % 7;
              return (
                <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: dow === 0 ? "#FF6A45" : dow === 6 ? "#3B5BDB" : "#64708A" }}>{day}</span>
                  <input
                    type="number"
                    value={rows[day]?.hours || ""}
                    placeholder="-"
                    onChange={(e) => updateHour(day, e.target.value)}
                    style={{
                      width: "100%", boxSizing: "border-box", padding: "6px 2px", borderRadius: 8,
                      border: "1.5px solid #E3E9F3", fontSize: 12, fontWeight: 700, textAlign: "center",
                      background: rows[day]?.hours ? "#E4F3EF" : "#fff",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button onClick={saveAll} disabled={saving} style={{ ...primaryBtnStyle, width: "100%", marginTop: 14, padding: "14px 0" }}>
        {saving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}

// 대략적인 공제율 (2026년 일반 요율 기준 추정치 — 실제 신고 전 반드시 재확인 필요)
const INSURANCE_RATES = { pension: 4.5, health: 3.545, employment: 0.9 };

// 일요일 시작 기준 주 단위로 묶기 위한 키
function weekKeyOf(year, month, day) {
  const d = new Date(year, month - 1, day);
  const dow = d.getDay(); // 0=일 ~ 6=토
  d.setDate(d.getDate() - dow);
  return d.toDateString();
}

// 주휴수당 = Σ (해당 주 근무시간이 15시간 이상일 때, min(주 근무시간,40)/40 × 8 × 시급)
// 월 경계에 걸친 주는 해당 월에 입력된 날짜만으로 계산되어 다소 오차가 있을 수 있음

function computePay(emp, hours, juhyuAmount = 0) {
  const base = emp.pay_type === "hourly" ? Math.round((Number(emp.hourly_wage) || 0) * hours) : Number(emp.monthly_salary) || 0;
  const juhyu = emp.pay_type === "hourly" && emp.juhyu_included ? Math.round(juhyuAmount) : 0;
  const gross = base + juhyu;
  let deductRate = 0;
  if (emp.tax33) deductRate += 3.3;
  if (emp.ins_pension) deductRate += INSURANCE_RATES.pension;
  if (emp.ins_health) deductRate += INSURANCE_RATES.health;
  if (emp.ins_employment) deductRate += INSURANCE_RATES.employment;
  const deduction = Math.round((gross * deductRate) / 100);
  return { base, juhyu, gross, deduction, net: gross - deduction, deductRate };
}

function PayrollTab({ paylog }) {
  const { employees, loading: empLoading } = paylog;
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [hoursByEmployee, setHoursByEmployee] = useState({});
  const [juhyuByEmployee, setJuhyuByEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = React.useRef(null);

  React.useEffect(() => {
    const load = async () => {
      if (employees.length === 0) return;
      setLoading(true);
      const ids = employees.map((e) => e.id);
      const { data } = await supabase.from("schedules").select("employee_id, day_of_month, hours").eq("year", year).eq("month", month).in("employee_id", ids);

      const totalMap = {};
      const weekMap = {}; // employee_id -> { weekKey: hours }
      (data || []).forEach((r) => {
        totalMap[r.employee_id] = (totalMap[r.employee_id] || 0) + Number(r.hours);
        const wk = weekKeyOf(year, month, r.day_of_month);
        weekMap[r.employee_id] = weekMap[r.employee_id] || {};
        weekMap[r.employee_id][wk] = (weekMap[r.employee_id][wk] || 0) + Number(r.hours);
      });

      const juhyuMap = {};
      employees.forEach((emp) => {
        if (emp.pay_type !== "hourly" || !emp.juhyu_included) { juhyuMap[emp.id] = 0; return; }
        const weeks = weekMap[emp.id] || {};
        const wage = Number(emp.hourly_wage) || 0;
        let total = 0;
        Object.values(weeks).forEach((weekHours) => {
          if (weekHours >= 15) total += (Math.min(weekHours, 40) / 40) * 8 * wage;
        });
        juhyuMap[emp.id] = total;
      });

      setHoursByEmployee(totalMap);
      setJuhyuByEmployee(juhyuMap);
      setLoading(false);
    };
    load();
  }, [employees, year, month]);

  if (empLoading || loading) return <EmptyState text="불러오는 중..." />;
  if (employees.length === 0) return <EmptyState text="먼저 직원을 등록해주세요" />;

  const rows = employees.map((emp) => {
    const hours = hoursByEmployee[emp.id] || 0;
    const pay = computePay(emp, hours, juhyuByEmployee[emp.id] || 0);
    return { emp, hours, ...pay };
  });
  const totalNet = rows.reduce((sum, r) => sum + r.net, 0);
  const totalGross = rows.reduce((sum, r) => sum + r.gross, 0);

  const exportImage = async () => {
    if (!exportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(exportRef.current, { backgroundColor: "#F3F6FB", scale: 2 });
      const link = document.createElement("a");
      link.download = `급여_${year}년${month}월.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input type="number" value={year} onFocus={(e) => e.target.select()} onChange={(e) => setYear(Number(e.target.value) || now.getFullYear())} style={{ ...inputStyle, flex: 1 }} />
        <input type="number" value={month} min="1" max="12" onFocus={(e) => e.target.select()} onChange={(e) => setMonth(Number(e.target.value) || 1)} style={{ ...inputStyle, flex: 1 }} />
        <button onClick={exportImage} disabled={exporting} style={{ ...primaryBtnStyle, flex: 1, padding: "11px 0" }}>
          {exporting ? "저장 중..." : "이미지 저장"}
        </button>
      </div>

      <div ref={exportRef} style={{ background: "#F3F6FB", padding: 4 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <StatBox label={`${year}년 ${month}월 총 인건비(세전)`} value={`${totalGross.toLocaleString()}원`} />
          <StatBox label="실지급 합계" value={`${totalNet.toLocaleString()}원`} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map(({ emp, hours, base, juhyu, gross, deduction, net, deductRate }) => (
            <div key={emp.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 2px rgba(16,24,43,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{emp.name}</span>
                <span style={{ fontSize: 12, color: "#64708A" }}>{emp.pay_type === "hourly" ? `${hours}시간` : "월급제"}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "#64708A" }}>
                기본급 {base.toLocaleString()}원{juhyu > 0 ? ` · 주휴수당 ${Math.round(juhyu).toLocaleString()}원` : ""}
                {deductRate > 0 ? ` · 공제 ${deductRate.toFixed(1)}% (${deduction.toLocaleString()}원)` : ""}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0A6E5D", marginTop: 4 }}>실수령 {net.toLocaleString()}원</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 11.5, color: "#A6AEC1", lineHeight: 1.5 }}>
        <Info size={13} style={{ flexShrink: 0 }} />
        주휴수당은 일요일~토요일 기준 주 15시간 이상 근무 시 자동 계산돼요 (월 경계에 걸친 주는 오차가 있을 수 있어요). 4대보험 공제율은 일반적인 추정치라 실제 신고 전 꼭 확인해주세요.
      </div>
    </div>
  );
}

function PaylogDetail({ goBack }) {
  const [tab, setTab] = useState("payroll");
  const paylog = usePaylogEmployees();

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <TopBar title="페이로그" onBack={goBack} />
      <div style={{ padding: "8px 0 0" }}>
        <p style={{ fontSize: 13.5, color: "#64708A", margin: "0 0 16px" }}>직원 추가 → 스케줄 입력 → 월말 급여 확인</p>
        <SegmentedTabs tabs={PAYLOG_TABS} value={tab} onChange={setTab} />
        {tab === "staff" && <StaffTab paylog={paylog} />}
        {tab === "schedule" && <ScheduleTab paylog={paylog} />}
        {tab === "payroll" && <PayrollTab paylog={paylog} />}
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
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  const submit = async () => {
    setError("");
    if (!userId || !pw) {
      setError("아이디와 비밀번호를 입력해주세요");
      return;
    }
    const email = `${userId.trim().toLowerCase()}@paylog.app`;
    setLoading(true);
    if (mode === "login") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (err) setError(err.message === "Invalid login credentials" ? "아이디 또는 비밀번호가 맞지 않아요" : err.message);
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
              <div style={{ fontSize: 12.5, color: "#64708A", marginBottom: 6, fontWeight: 600 }}>아이디</div>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="PayLog에서 쓰시는 아이디"
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
